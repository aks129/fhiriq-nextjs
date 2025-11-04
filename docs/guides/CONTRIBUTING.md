# Contributing to FHIR IQ Guides

Thank you for considering contributing to the FHIR IQ community guides! These guides are built by practitioners, for practitioners.

## Philosophy

Our guides are:
- **Experience-Driven**: Based on real implementations, not just theory
- **Practical**: Focus on what works in production environments
- **Community-Sourced**: Improved by collective knowledge and experience
- **Evolving**: Updated as FHIR standards and best practices evolve

## Ways to Contribute

### 1. Share Implementation Experience

The most valuable contributions come from real-world experience:

- Share what worked (and what didn't) in your implementations
- Document edge cases you encountered
- Provide performance benchmarks or optimization techniques
- Explain integration challenges and solutions

**Example Contribution:**
```markdown
### Performance Tip: Bulk FHIR Exports

In our implementation at [Organization], we found that...

**Problem**: Standard FHIR $export was timing out for large patient populations (>100K)

**Solution**: Implemented partitioning by patient ID ranges:
- Partition 1: Patients A-F (30K patients, ~2GB)
- Partition 2: Patients G-M (35K patients, ~2.3GB)
...

**Results**: Reduced export time from 4 hours (timeout) to 45 minutes average

Code example: [link to gist]
```

### 2. Add Code Examples

Practical code examples are incredibly helpful:

- FHIR resource examples (JSON/XML)
- CQL logic snippets
- Mapping transformations
- API integration code
- Validation scripts

**Quality Guidelines:**
- Use realistic data (anonymized/synthetic)
- Include comments explaining key decisions
- Specify FHIR version (R4, R5)
- Test your examples before submitting

### 3. Improve Existing Content

- Fix typos or unclear explanations
- Update outdated information
- Add missing context or clarifications
- Improve formatting or organization
- Add cross-references between guides

### 4. Add Diagrams and Visuals

Visual aids help tremendously:

- Architecture diagrams
- Data flow diagrams
- Sequence diagrams
- Decision trees
- Screenshots of tools

**Formats we accept:**
- SVG (preferred for diagrams)
- PNG (for screenshots)
- Mermaid syntax (for simple diagrams)
- ASCII art (for inline simple flows)

### 5. Link to Resources

Help others learn faster:

- Link to official FHIR specs
- Reference Implementation Guides (US Core, Da Vinci, etc.)
- Share helpful blog posts or talks
- Recommend useful tools or libraries

## Contribution Process

### Step 1: Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/fhiriq-nextjs.git
cd fhiriq-nextjs
git remote add upstream https://github.com/aks129/fhiriq-nextjs.git
```

### Step 2: Create a Branch

```bash
git checkout -b feature/add-bulk-export-example
# or
git checkout -b fix/typo-in-cql-guide
```

Branch naming conventions:
- `feature/description` - New content or examples
- `fix/description` - Bug fixes or corrections
- `docs/description` - Documentation improvements

### Step 3: Make Your Changes

Edit files in `docs/guides/`:
- `mapping-guide.md` - FHIR mapping examples
- `cql-guide.md` - CQL and quality measures
- `profiling-guide.md` - FHIR profiling and modeling
- `architectures-guide.md` - Architecture patterns

### Step 4: Test Your Changes

- Preview markdown rendering locally
- Verify all links work
- Test any code examples
- Check for typos and formatting

### Step 5: Commit with Clear Messages

```bash
git add docs/guides/cql-guide.md
git commit -m "Add example: Complex CQL logic for diabetes measures

- Added working CQL example for HbA1c monitoring
- Included FHIR resource examples
- Documented common pitfalls with date comparisons
- Based on production implementation at XYZ Health"
```

**Good commit messages:**
- Start with verb (Add, Fix, Update, Remove)
- Be specific about what changed
- Explain why if not obvious
- Reference issues if applicable (#123)

### Step 6: Push and Create Pull Request

```bash
git push origin feature/add-bulk-export-example
```

Then on GitHub:
1. Click "New Pull Request"
2. Choose your branch
3. Fill out the PR template
4. Submit!

## Pull Request Template

When you create a PR, please include:

```markdown
## Summary
Brief description of what this PR adds/changes

## Type of Change
- [ ] New content/example
- [ ] Bug fix/correction
- [ ] Documentation improvement
- [ ] Link to external resource

## Guide(s) Affected
- [ ] Mapping Guide
- [ ] CQL Guide
- [ ] Profiling Guide
- [ ] Architectures Guide

## Checklist
- [ ] Content is based on real implementation experience
- [ ] Code examples are tested and work
- [ ] Links are valid and relevant
- [ ] Markdown formatting is correct
- [ ] FHIR version is specified where relevant

## Additional Context
Any extra information that helps reviewers understand your contribution
```

## Style Guidelines

### Markdown Formatting

- Use proper heading hierarchy (##, ###, ####)
- Include code fences with language specification:
  ```json
  {
    "resourceType": "Patient"
  }
  ```
- Use bullet points for lists
- Use tables for comparisons
- Bold **important terms** on first use
- Use `inline code` for resource names, properties

### Writing Style

- **Be concise but complete**: Don't assume too much prior knowledge
- **Use active voice**: "We implemented..." not "It was implemented..."
- **Include context**: Explain *why* not just *what*
- **Be honest**: Share failures as well as successes
- **Stay current**: Prefer latest FHIR versions
- **Cite sources**: Link to official specs, IGs, or authoritative sources

### Code Examples

```json
{
  "resourceType": "Patient",
  "id": "example-123",  // Clear, descriptive IDs
  "name": [{
    "family": "Smith",
    "given": ["John"]
  }],
  // Comment on non-obvious choices
  "birthDate": "1990-01-01"
}
```

**Best Practices:**
- Use realistic but anonymized data
- Add comments for non-obvious decisions
- Keep examples focused and minimal
- Specify FHIR version in header or comment
- Test examples before submitting

## Review Process

1. **Automated Checks**: PR triggers build and lint checks
2. **Community Review**: Other contributors may comment
3. **Maintainer Review**: FHIR IQ team reviews for accuracy
4. **Approval & Merge**: Once approved, changes are merged
5. **Website Update**: Changes appear on fhiriq.com within minutes

## Recognition

Contributors are recognized:
- In the guide's contributor section
- In release notes
- On the FHIR IQ website (if desired)
- Via shout-outs on the podcast (for significant contributions)

## Questions?

- Open a GitHub Discussion for general questions
- Comment on existing issues for specific topics
- Reach out via [fhiriq.com/contact](https://www.fhiriq.com/contact)
- Join us on FHIR Slack: [chat.fhir.org](https://chat.fhir.org)

## Code of Conduct

Be respectful, constructive, and collaborative. We're all here to learn and improve FHIR implementations together.

---

Thank you for contributing to the FHIR community! 🚀
