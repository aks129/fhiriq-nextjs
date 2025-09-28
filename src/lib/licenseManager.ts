import { v4 as uuidv4 } from 'uuid';

export interface LicenseData {
  licenseKey?: string;
  orderId: string;
  customerId?: string;
  customerEmail: string;
  productSku: string;
  productName: string;
  productCategory: string;
  edition: string;
  term: string;
  status?: string;
  activatedAt?: Date | null;
  expiresAt?: Date;
  maxUsers?: number;
  currentUsers?: number;
  features?: string[];
  deliverables?: any;
  metadata?: {
    orderDate: Date;
    price: number;
    currency: string;
  };
  lastAccessedAt?: Date | null;
  accessCount?: number;
  ipAddresses?: string[];
  userAgents?: string[];
}

export interface License extends LicenseData {
  _id: string;
  createdAt: Date;
  lastModified?: Date;
}

/**
 * License generation and management for FHIR IQ products
 */
export async function createLicense(orderData: any): Promise<License[]> {
  try {
    console.log('Processing order for license generation:', orderData.orderId);

    const licenses: License[] = [];

    // Process each line item in the order
    for (const item of orderData.lineItems) {
      const product = await getProductBySku(item.sku);

      if (!product) {
        console.error('Product not found for SKU:', item.sku);
        continue;
      }

      // Generate license for digital products only
      if (product.digital && product.deliverables?.type === 'license_key') {
        const licenseData: LicenseData = {
          licenseKey: generateLicenseKey(product.category, product.edition),
          orderId: orderData.orderId,
          customerId: orderData.customerId,
          customerEmail: orderData.customerEmail,
          productSku: product.sku,
          productName: product.name,
          productCategory: product.category,
          edition: product.edition,
          term: product.term,
          status: 'active',
          activatedAt: null, // Will be set when first used
          expiresAt: calculateExpirationDate(product.term),
          maxUsers: product.deliverables.maxUsers || 1,
          currentUsers: 0,
          features: product.features || [],
          deliverables: product.deliverables,
          metadata: {
            orderDate: new Date(orderData.createdAt),
            price: item.price,
            currency: item.currency
          },
          lastAccessedAt: null,
          accessCount: 0,
          ipAddresses: [],
          userAgents: []
        };

        const license = await saveLicense(licenseData);
        licenses.push(license);

        console.log('License created:', license.licenseKey);

        // Send license delivery email
        await sendLicenseEmail(license, orderData);
      }
    }

    return licenses;

  } catch (error) {
    console.error('Error creating licenses:', error);
    throw error;
  }
}

/**
 * Generate a unique license key based on product category and edition
 */
function generateLicenseKey(category: string, edition: string): string {
  const prefixes: Record<string, string> = {
    'license': 'FHIR-LIC',
    'training': 'FHIR-TRN',
    'consulting': 'FHIR-CON',
    'bundle': 'FHIR-BDL',
    'addon': 'FHIR-ADD'
  };

  const editionCodes: Record<string, string> = {
    'basic': 'BAS',
    'professional': 'PRO',
    'enterprise': 'ENT',
    'fundamentals': 'FND',
    'advanced': 'ADV',
    'team': 'TEA',
    'starter': 'STR',
    'premium': 'PRM',
    'onsite': 'ONS',
    'startup': 'SUP'
  };

  const prefix = prefixes[category] || 'FHIR-GEN';
  const editionCode = editionCodes[edition] || 'STD';
  const uuid = uuidv4().substring(0, 8).toUpperCase();

  return `${prefix}-${editionCode}-${uuid}`;
}

/**
 * Calculate license expiration date based on term
 */
function calculateExpirationDate(term: string): Date {
  const now = new Date();
  const expirationDate = new Date(now);

  switch (term) {
    case 'annual':
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    case 'monthly':
      expirationDate.setMonth(now.getMonth() + 1);
      break;
    case 'single_seat':
    case 'single_day':
    case 'hours_block':
      // For single-use items, set expiration to 1 year for access purposes
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    case 'team_package':
      expirationDate.setFullYear(now.getFullYear() + 1);
      break;
    default:
      // Default to 1 year
      expirationDate.setFullYear(now.getFullYear() + 1);
  }

  return expirationDate;
}

/**
 * Validate and activate a license key
 */
export async function activateLicense(licenseKey: string, userInfo: any = {}) {
  try {
    const license = await getLicenseByKey(licenseKey);

    if (!license) {
      throw new Error('Invalid license key');
    }

    if (license.status !== 'active') {
      throw new Error('License is not active');
    }

    if (new Date() > new Date(license.expiresAt!)) {
      throw new Error('License has expired');
    }

    // Update license with activation info
    const updatedLicense = await updateLicense(license._id, {
      activatedAt: license.activatedAt || new Date(),
      lastAccessedAt: new Date(),
      accessCount: (license.accessCount || 0) + 1,
      ipAddresses: [...new Set([...(license.ipAddresses || []), userInfo.ipAddress].filter(Boolean))],
      userAgents: [...new Set([...(license.userAgents || []), userInfo.userAgent].filter(Boolean))]
    });

    return {
      valid: true,
      license: updatedLicense,
      features: license.features,
      deliverables: license.deliverables
    };

  } catch (error) {
    console.error('License activation error:', error);
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Placeholder functions - these would integrate with your database
async function getProductBySku(sku: string): Promise<any> {
  // This would connect to your database
  // For now, return a mock product
  return {
    sku,
    name: 'FHIR Developer License',
    category: 'license',
    edition: 'professional',
    term: 'annual',
    digital: true,
    features: ['Advanced FHIR validation', 'Premium code generators'],
    deliverables: { type: 'license_key', maxUsers: 5 }
  };
}

async function saveLicense(licenseData: LicenseData): Promise<License> {
  // This would save to your database
  // For now, return a mock license with ID
  const license: License = {
    ...licenseData,
    _id: uuidv4(),
    createdAt: new Date()
  };
  return license;
}

async function getLicenseByKey(licenseKey: string): Promise<License | null> {
  // This would query your database
  // For now, return null
  return null;
}

async function updateLicense(licenseId: string, updateData: Partial<LicenseData>): Promise<License> {
  // This would update your database
  // For now, return a mock updated license
  const license: License = {
    _id: licenseId,
    licenseKey: 'FHIR-LIC-PRO-TEST123',
    orderId: 'order123',
    customerEmail: 'test@example.com',
    productSku: 'FHIR-DEV-PRO-1Y',
    productName: 'FHIR Developer License',
    productCategory: 'license',
    edition: 'professional',
    term: 'annual',
    status: 'active',
    createdAt: new Date(),
    ...updateData
  };
  return license;
}

async function sendLicenseEmail(license: License, orderData: any): Promise<void> {
  // This would send an email
  console.log('License email would be sent to:', license.customerEmail);
  console.log('License key:', license.licenseKey);
}