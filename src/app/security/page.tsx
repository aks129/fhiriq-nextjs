'use client';

import Link from 'next/link';

export default function SecurityPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-blue">
                FHIR IQ
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/solutions" className="text-neutral-gray hover:text-primary-blue font-medium">
                Solutions
              </Link>
              <Link href="/tools" className="text-neutral-gray hover:text-primary-blue font-medium">
                Tools
              </Link>
              <Link href="/about" className="text-neutral-gray hover:text-primary-blue font-medium">
                About
              </Link>
              <Link href="/contact" className="text-neutral-gray hover:text-primary-blue font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Security Policy Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Information Security Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: January 17, 2025</p>

        <div className="prose prose-lg max-w-none">
          {/* Executive Summary */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
            <p className="text-gray-700 mb-4">
              FHIR IQ is committed to maintaining the highest standards of information security to protect our clients, partners, and stakeholders. This Information Security Policy establishes the framework for securing all information assets, systems, and data under FHIR IQ's control.
            </p>
            <p className="text-gray-700">
              This policy applies to all employees, contractors, consultants, temporary staff, and other workers at FHIR IQ, including all personnel affiliated with third parties who have access to FHIR IQ systems and data.
            </p>
          </section>

          {/* Purpose and Scope */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Purpose and Scope</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1 Purpose</h3>
            <p className="text-gray-700 mb-4">
              The purpose of this Information Security Policy is to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Protect the confidentiality, integrity, and availability of information assets</li>
              <li>Ensure compliance with applicable laws, regulations, and contractual obligations</li>
              <li>Minimize security risks and prevent unauthorized access to information</li>
              <li>Establish clear roles and responsibilities for information security</li>
              <li>Provide a framework for responding to security incidents</li>
              <li>Support business continuity and disaster recovery efforts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">1.2 Scope</h3>
            <p className="text-gray-700 mb-4">
              This policy applies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>All information assets owned or managed by FHIR IQ</li>
              <li>All information systems, networks, and infrastructure</li>
              <li>All physical and electronic data, including client data and healthcare information</li>
              <li>All locations where FHIR IQ conducts business</li>
              <li>All personnel with access to FHIR IQ systems and data</li>
              <li>Third-party service providers and business partners</li>
            </ul>
          </section>

          {/* Governance and Organization */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Security Governance</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Security Roles and Responsibilities</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <p className="text-gray-700 mb-3"><strong>Executive Management:</strong></p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Overall accountability for information security</li>
                <li>Approval of security policies and major investments</li>
                <li>Resource allocation for security initiatives</li>
              </ul>

              <p className="text-gray-700 mb-3"><strong>Security Officer:</strong></p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Implementation and management of security program</li>
                <li>Security risk assessment and monitoring</li>
                <li>Incident response coordination</li>
                <li>Security awareness training</li>
              </ul>

              <p className="text-gray-700 mb-3"><strong>All Employees:</strong></p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Compliance with security policies and procedures</li>
                <li>Reporting security incidents and vulnerabilities</li>
                <li>Protecting assigned information assets</li>
                <li>Completing required security training</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Policy Review and Updates</h3>
            <p className="text-gray-700">
              This policy is reviewed annually and updated as needed to address emerging threats, regulatory changes, and business requirements. All policy changes are approved by executive management.
            </p>
          </section>

          {/* Information Classification */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Classification and Handling</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Data Classification</h3>
            <div className="space-y-4 mb-4">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold text-gray-900">Critical/Confidential</p>
                <p className="text-gray-700 text-sm">Protected Health Information (PHI), client data, financial records, authentication credentials, proprietary business information</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-semibold text-gray-900">Internal Use Only</p>
                <p className="text-gray-700 text-sm">Internal communications, project documentation, employee information, non-public technical specifications</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-gray-900">Public</p>
                <p className="text-gray-700 text-sm">Marketing materials, published documentation, public website content, press releases</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Data Handling Requirements</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Critical/Confidential data must be encrypted in transit and at rest</li>
              <li>Access to sensitive data requires authentication and authorization</li>
              <li>Data must be transmitted using secure protocols (HTTPS, SFTP, etc.)</li>
              <li>Sensitive data disposal must use approved secure deletion methods</li>
              <li>Physical documents containing sensitive data must be securely stored and shredded when disposed</li>
            </ul>
          </section>

          {/* Access Control */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Access Control and Authentication</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 User Access Management</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Access is granted based on the principle of least privilege</li>
              <li>All user accounts require unique credentials</li>
              <li>Multi-factor authentication (MFA) is required for all system access</li>
              <li>Access rights are reviewed quarterly and upon role changes</li>
              <li>Terminated employee access is revoked within 24 hours</li>
              <li>Shared accounts and generic credentials are prohibited</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Password Requirements</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Minimum 12 characters in length</li>
              <li>Combination of uppercase, lowercase, numbers, and special characters</li>
              <li>Password changes required every 90 days</li>
              <li>No reuse of previous 12 passwords</li>
              <li>Account lockout after 5 failed login attempts</li>
              <li>Use of password managers is encouraged</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Privileged Access Management</h3>
            <p className="text-gray-700">
              Administrative and privileged accounts require enhanced security controls, including separate credentials, additional monitoring, and justification for access requests.
            </p>
          </section>

          {/* Network and System Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Network and System Security</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Network Security Controls</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Network segmentation to isolate sensitive systems</li>
              <li>Firewall protection at network perimeters</li>
              <li>Intrusion detection and prevention systems (IDS/IPS)</li>
              <li>Regular network vulnerability scanning</li>
              <li>Secure configuration of network devices</li>
              <li>VPN required for remote access</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Endpoint Security</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Anti-malware software on all endpoints</li>
              <li>Operating system and application patches applied within 30 days</li>
              <li>Full-disk encryption on laptops and mobile devices</li>
              <li>Automatic screen lock after 10 minutes of inactivity</li>
              <li>Approved software whitelist enforcement</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Cloud and Third-Party Services</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Security assessment required before cloud service adoption</li>
              <li>Data encryption for data stored in cloud services</li>
              <li>Regular review of cloud security configurations</li>
              <li>Vendor security certifications verified (SOC 2, ISO 27001)</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Protection and Privacy</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Healthcare Data Protection</h3>
            <p className="text-gray-700 mb-4">
              FHIR IQ handles Protected Health Information (PHI) and healthcare-related data with the highest level of security:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>HIPAA compliance for all PHI handling activities</li>
              <li>Encryption of PHI in transit (TLS 1.2 or higher) and at rest (AES-256)</li>
              <li>Audit logging of all PHI access and modifications</li>
              <li>Business Associate Agreements (BAA) with all relevant vendors</li>
              <li>Regular HIPAA Security Rule compliance assessments</li>
              <li>De-identification procedures following HIPAA Safe Harbor method</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Data Backup and Recovery</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Daily automated backups of critical systems and data</li>
              <li>Encrypted backup storage in geographically diverse locations</li>
              <li>Quarterly backup restoration testing</li>
              <li>30-day retention for daily backups</li>
              <li>12-month retention for monthly backups</li>
              <li>Recovery Time Objective (RTO): 4 hours for critical systems</li>
              <li>Recovery Point Objective (RPO): 24 hours</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Data Retention and Disposal</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Client data retained per contractual agreements (minimum 7 years)</li>
              <li>Healthcare data retained in compliance with federal and state requirements</li>
              <li>Secure data disposal using NIST-approved methods</li>
              <li>Certificate of destruction maintained for all disposed media</li>
            </ul>
          </section>

          {/* Application Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Application and Development Security</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Secure Development Practices</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Security requirements integrated into development lifecycle</li>
              <li>Code reviews with security focus before production deployment</li>
              <li>Static Application Security Testing (SAST) for all code</li>
              <li>Dynamic Application Security Testing (DAST) for web applications</li>
              <li>Dependency scanning for third-party libraries</li>
              <li>Security training for all developers</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 FHIR-Specific Security</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>OAuth 2.0 implementation for FHIR API authorization</li>
              <li>SMART on FHIR authentication framework compliance</li>
              <li>FHIR resource-level access controls</li>
              <li>Validation against FHIR profiles and implementation guides</li>
              <li>Audit logging of all FHIR resource access</li>
              <li>TLS 1.2+ required for all FHIR API communications</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Production Environment Security</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Separation of development, testing, and production environments</li>
              <li>Change management process for production deployments</li>
              <li>Production data not used in non-production environments</li>
              <li>Web application firewall (WAF) protection</li>
              <li>API rate limiting and throttling</li>
            </ul>
          </section>

          {/* Security Monitoring */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Security Monitoring and Logging</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Logging Requirements</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Centralized logging for all systems and applications</li>
              <li>Logs protected from unauthorized modification</li>
              <li>Minimum 12-month log retention</li>
              <li>Logging of authentication events (success and failure)</li>
              <li>Logging of privileged operations</li>
              <li>Logging of data access and modifications</li>
              <li>System errors and security events logged</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Security Monitoring</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>24/7 security monitoring of critical systems</li>
              <li>Real-time alerting for security events</li>
              <li>Regular log review and analysis</li>
              <li>Security Information and Event Management (SIEM) system</li>
              <li>Threat intelligence integration</li>
            </ul>
          </section>

          {/* Incident Response */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Incident Response and Management</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 Incident Response Process</h3>
            <p className="text-gray-700 mb-4">
              FHIR IQ maintains a formal incident response plan with the following phases:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Detection and Reporting:</strong> Identification of security incidents through monitoring or reporting</li>
              <li><strong>Assessment:</strong> Evaluation of incident severity and impact</li>
              <li><strong>Containment:</strong> Isolation of affected systems to prevent further damage</li>
              <li><strong>Eradication:</strong> Removal of threat and closing of vulnerabilities</li>
              <li><strong>Recovery:</strong> Restoration of systems to normal operations</li>
              <li><strong>Post-Incident Review:</strong> Analysis and lessons learned documentation</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Incident Severity Classification</h3>
            <div className="space-y-3 mb-4">
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <p className="font-semibold text-gray-900">Critical (P1)</p>
                <p className="text-gray-700 text-sm">PHI breach, system-wide outage, ransomware - Response within 1 hour</p>
              </div>

              <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-500">
                <p className="font-semibold text-gray-900">High (P2)</p>
                <p className="text-gray-700 text-sm">Significant service degradation, potential data exposure - Response within 4 hours</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
                <p className="font-semibold text-gray-900">Medium (P3)</p>
                <p className="text-gray-700 text-sm">Minor service impact, security vulnerability identified - Response within 24 hours</p>
              </div>

              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <p className="font-semibold text-gray-900">Low (P4)</p>
                <p className="text-gray-700 text-sm">Minimal impact, policy violation - Response within 72 hours</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">9.3 Breach Notification</h3>
            <p className="text-gray-700 mb-4">
              In the event of a data breach involving PHI or personally identifiable information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Affected clients notified within 72 hours of discovery</li>
              <li>Breach reported to Department of Health and Human Services (HHS) if required</li>
              <li>State attorney general notification per state requirements</li>
              <li>Documentation of breach circumstances and response actions</li>
              <li>Credit monitoring offered to affected individuals when appropriate</li>
            </ul>
          </section>

          {/* Vendor Management */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party and Vendor Management</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 Vendor Security Assessment</h3>
            <p className="text-gray-700 mb-4">
              All third-party vendors with access to FHIR IQ systems or data undergo security assessment:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Security questionnaire completion before engagement</li>
              <li>Review of security certifications (SOC 2, ISO 27001, HITRUST)</li>
              <li>Business Associate Agreement (BAA) for PHI access</li>
              <li>Data Processing Agreement (DPA) for personal data</li>
              <li>Annual vendor security reassessment</li>
              <li>Right to audit vendor security controls</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Vendor Access Control</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Minimum necessary access principle</li>
              <li>Time-limited access credentials</li>
              <li>Enhanced monitoring of vendor activities</li>
              <li>Immediate revocation upon contract termination</li>
            </ul>
          </section>

          {/* Physical Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Physical Security</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Secure facility access controls</li>
              <li>Visitor sign-in and escort requirements</li>
              <li>Secured server rooms with access logging</li>
              <li>Clear desk policy for sensitive documents</li>
              <li>Secure disposal bins for confidential materials</li>
              <li>Environmental controls (fire suppression, climate)</li>
            </ul>
          </section>

          {/* Business Continuity */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Business Continuity and Disaster Recovery</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">12.1 Business Continuity Planning</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Documented business continuity and disaster recovery plans</li>
              <li>Annual business impact analysis</li>
              <li>Identification of critical business functions</li>
              <li>Defined recovery time and recovery point objectives</li>
              <li>Alternative work arrangements for staff</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">12.2 Testing and Maintenance</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Annual disaster recovery testing</li>
              <li>Quarterly backup restoration verification</li>
              <li>Plan updates following testing or incidents</li>
              <li>Staff training on continuity procedures</li>
            </ul>
          </section>

          {/* Training and Awareness */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Security Training and Awareness</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">13.1 Training Requirements</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Security awareness training for all employees upon hire</li>
              <li>Annual security refresher training</li>
              <li>Role-specific security training (developers, administrators)</li>
              <li>HIPAA privacy and security training for personnel with PHI access</li>
              <li>Phishing awareness and simulation exercises</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">13.2 Security Awareness Program</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Monthly security tips and communications</li>
              <li>Incident lessons learned sharing</li>
              <li>Security threat updates and alerts</li>
              <li>Positive reinforcement for security-conscious behavior</li>
            </ul>
          </section>

          {/* Compliance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Compliance and Audit</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">14.1 Regulatory Compliance</h3>
            <p className="text-gray-700 mb-4">
              FHIR IQ maintains compliance with applicable regulations and standards:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>HIPAA Security and Privacy Rules</li>
              <li>HITECH Act requirements</li>
              <li>Federal and state data protection laws</li>
              <li>Payment Card Industry Data Security Standard (PCI DSS) where applicable</li>
              <li>Industry best practices (NIST Cybersecurity Framework, ISO 27001)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">14.2 Security Assessments</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Annual independent security assessment</li>
              <li>Quarterly vulnerability scans</li>
              <li>Annual penetration testing of external systems</li>
              <li>HIPAA Security Rule compliance assessment</li>
              <li>Internal security audits</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">14.3 Documentation and Records</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Security policy and procedure documentation</li>
              <li>Risk assessment and treatment records</li>
              <li>Incident response documentation</li>
              <li>Audit logs and security event records</li>
              <li>Training completion records</li>
              <li>Vendor security assessments</li>
            </ul>
          </section>

          {/* Policy Violations */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Policy Violations and Enforcement</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">15.1 Consequences</h3>
            <p className="text-gray-700 mb-4">
              Violations of this Information Security Policy may result in:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Verbal or written warning</li>
              <li>Mandatory additional security training</li>
              <li>Suspension or revocation of system access privileges</li>
              <li>Termination of employment or contract</li>
              <li>Legal action where appropriate</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">15.2 Reporting Violations</h3>
            <p className="text-gray-700">
              All employees are required to report suspected security policy violations or security incidents immediately to their supervisor or the Security Officer. Reports can be made confidentially without fear of retaliation.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about this Information Security Policy or to report security concerns:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-900 font-semibold mb-2">FHIR IQ Security Team</p>
              <p className="text-gray-700">Email: <a href="mailto:security@fhiriq.com" className="text-primary-blue hover:underline">security@fhiriq.com</a></p>
              <p className="text-gray-700">General Contact: <a href="mailto:gene@fhiriq.com" className="text-primary-blue hover:underline">gene@fhiriq.com</a></p>
              <p className="text-gray-700">Website: <a href="https://www.fhiriq.com" className="text-primary-blue hover:underline">www.fhiriq.com</a></p>
              <p className="text-gray-700 mt-4">
                For urgent security incidents, use the subject line "URGENT SECURITY INCIDENT" for priority handling.
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Policy Acknowledgment</h2>
            <p className="text-gray-700 mb-4">
              All employees, contractors, and authorized users must acknowledge receipt and understanding of this Information Security Policy. This acknowledgment is documented and maintained by Human Resources.
            </p>
            <p className="text-gray-700">
              By accessing FHIR IQ systems and data, you acknowledge that you have read, understood, and agree to comply with this Information Security Policy and all related security procedures.
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FHIR IQ</h3>
              <p className="text-gray-400">
                Leading healthcare interoperability solutions powered by AI and FHIR expertise.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
                <li><Link href="/training" className="hover:text-white">Training</Link></li>
                <li><Link href="/consulting" className="hover:text-white">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/architectures" className="hover:text-white">Architectures</Link></li>
                <li><Link href="/resources" className="hover:text-white">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Policies</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/security" className="hover:text-white">Security Policy</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-3">&copy; 2025 FHIR IQ. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              FHIR® is a registered trademark of Health Level Seven International (HL7®) and is used with permission.
              Use of this trademark does not constitute endorsement by HL7 or represent any official HL7 initiatives.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
