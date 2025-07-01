# Exemplos de Questões Reais - AWS Cloud Practitioner (CLF-C02)

## Questão 1 - Snowball Edge
**Pergunta:** A company plans to use an Amazon Snowball Edge device to transfer files to the AWS Cloud. Which activities related to a Snowball Edge device are available to the company at no cost?

**Opções:**
A. Use of the Snowball Edge appliance for a 10-day period
B. The transfer of data out of Amazon S3 and to the Snowball Edge appliance
C. The transfer of data from the Snowball Edge appliance into Amazon S3 ✓
D. Daily use of the Snowball Edge appliance after 10 days

**Domínio:** Billing, Pricing, and Support

---

## Questão 2 - Segurança e Vulnerabilidades
**Pergunta:** A company has deployed applications on Amazon EC2 instances. The company needs to assess application vulnerabilities and must identify infrastructure deployments that do not meet best practices. Which AWS service can the company use to meet these requirements?

**Opções:**
A. AWS Trusted Advisor
B. Amazon Inspector ✓
C. AWS Config
D. Amazon GuardDuty

**Domínio:** Security and Compliance

---

## Questão 3 - Storage Gateway
**Pergunta:** A company has a centralized group of users with large file storage requirements that have exceeded the space available on premises. The company wants to extend its file storage capabilities for this group while retaining the performance benefit of sharing content locally. What is the MOST operationally efficient AWS solution for this scenario?

**Opções:**
A. Create an Amazon S3 bucket for each user. Mount each bucket by using an S3 file system mounting utility.
B. Configure and deploy an AWS Storage Gateway file gateway. Connect each user's workstation to the file gateway. ✓
C. Move each user's working environment to Amazon WorkSpaces. Set up an Amazon WorkDocs account for each user.
D. Deploy an Amazon EC2 instance and attach an Amazon Elastic Block Store (Amazon EBS) Provisioned IOPS volume. Share the EBS volume directly with the users.

**Domínio:** Cloud Technology and Services

---

## Questão 4 - IAM Best Practices
**Pergunta:** According to security best practices, how should an Amazon EC2 instance be given access to an Amazon S3 bucket?

**Opções:**
A. Hard code an IAM user's secret key and access key directly in the application, and upload the file.
B. Store the IAM user's secret key and access key in a text file on the EC2 instance, read the keys, then upload the file.
C. Have the EC2 instance assume a role to obtain the privileges to upload the file. ✓
D. Modify the S3 bucket policy so that any service can upload to it at any time.

**Domínio:** Security and Compliance

---

## Questão 5 - Shared Responsibility Model
**Pergunta:** Which option is a customer responsibility when using Amazon DynamoDB under the AWS Shared Responsibility Model?

**Opções:**
A. Physical security of DynamoDB
B. Patching of DynamoDB
C. Access to DynamoDB tables ✓
D. Encryption of data at rest in DynamoDB

**Domínio:** Cloud Concepts

---

## Questão 6 - AWS CAF (Múltipla Escolha)
**Pergunta:** Which AWS services or tools can identify rightsizing opportunities for Amazon EC2 instances? (Choose two.)

**Opções:**
A. AWS Cost Explorer ✓
B. AWS Billing Conductor
C. Amazon CodeGuru
D. Amazon SageMaker
E. AWS Compute Optimizer ✓

**Domínio:** Billing, Pricing, and Support

---

## Questão 7 - AWS Trusted Advisor (Múltipla Resposta)
**Pergunta:** Which of the following are benefits of using AWS Trusted Advisor? (Choose two.)

**Opções:**
A. Providing high-performance container orchestration
B. Creating and rotating encryption keys
C. Detecting underutilized resources to save costs ✓
D. Improving security by proactively monitoring the AWS environment ✓
E. Implementing enforced tagging across AWS resources

**Domínio:** Billing, Pricing, and Support / Security and Compliance

---

## Análise dos Padrões das Questões

### Tipos de Questões Observadas:
1. **Múltipla escolha simples** (1 resposta correta)
2. **Múltipla resposta** (2 respostas corretas - "Choose two")

### Domínios Cobertos:
- Cloud Concepts (Shared Responsibility Model, AWS CAF)
- Security and Compliance (IAM, Inspector, Trusted Advisor)
- Cloud Technology and Services (Storage Gateway, EC2, DynamoDB)
- Billing, Pricing, and Support (Snowball pricing, Cost Explorer, Trusted Advisor)

### Características das Questões:
- Cenários práticos de empresas
- Foco em melhores práticas
- Conhecimento de serviços específicos da AWS
- Entendimento do modelo de responsabilidade compartilhada
- Otimização de custos e performance

