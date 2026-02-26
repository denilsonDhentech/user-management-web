# 📂 GED Document Manager - Web Client

Este repositório contém o front-end do sistema de **Gestão Eletrônica de Documentos (GED)**, desenvolvido em **Angular 21**. A aplicação oferece uma interface moderna, reativa e segura para o gerenciamento do ciclo de vida de documentos, usuários e trilhas de auditoria.

## 📋 Sumário
- [📂 GED Document Manager - Web Client](#-ged-document-manager---web-client)
  - [📋 Sumário](#-sumário)
  - [🚀 Tecnologias de Ponta](#-tecnologias-de-ponta)
  - [✨ Funcionalidades Implementadas](#-funcionalidades-implementadas)
    - [📄 Gestão de Documentos (MVP 4.2.B)](#-gestão-de-documentos-mvp-42b)
    - [👥 Administração de Usuários](#-administração-de-usuários)
    - [🔍 Auditoria (MVP 4.2.D)](#-auditoria-mvp-42d)
  - [⚙️ Configuração e Execução](#️-configuração-e-execução)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a Passo](#passo-a-passo)
  - [🔑 Credenciais de Acesso](#-credenciais-de-acesso)
  - [🧪 Estratégia de Testes](#-estratégia-de-testes)
- [Executar testes unitários (Vitest)](#executar-testes-unitários-vitest)
    - [🔍 Verificação de Auditoria (MVP 4.2.D)](#-verificação-de-auditoria-mvp-42d)
  - [🧠 Decisões de Projeto](#-decisões-de-projeto)
  - [🛠 Troubleshooting (Resolução de Problemas)](#-troubleshooting-resolução-de-problemas)
    - [O Front-end não consegue falar com o Back-end?](#o-front-end-não-consegue-falar-com-o-back-end)

---

## 🚀 Tecnologias de Ponta

Para garantir a melhor experiência em hardware de alta performance e monitores de alta taxa de atualização (180Hz), utilizamos:

- **Angular 21 (LTS):** Arquitetura 100% baseada em *Standalone Components*.
- **State Management:** Uso intensivo de **Signals** e `computed` para reatividade granular e performance otimizada.
- **UI Framework:** **PrimeNG 18+** com componentes densos e acessíveis.
- **Unit Testing:** **Vitest** como runner de testes, garantindo builds ultrarrápidos.
- **Styling:** SCSS modularizado com PrimeFlex para layouts responsivos.

---

## ✨ Funcionalidades Implementadas

### 📄 Gestão de Documentos (MVP 4.2.B)
- **Listagem Reativa:** Tabela com carregamento *Lazy* (paginação via backend).
- **Versionamento:** Diálogo de histórico que permite visualizar metadados de versões anteriores.
- **Download Inteligente:** Recuperação de arquivos por versão específica através de URLs assinadas.
- **Status Workflow:** Mudança dinâmica de status (Rascunho, Publicado, Arquivado).

### 👥 Administração de Usuários
- **CRUD Completo:** Criação e edição de usuários com validação de campos em tempo real.
- **RBAC (Role-Based Access Control):** A interface adapta-se dinamicamente aos perfis `ADMIN`, `USER` e `VIEWER`.

### 🔍 Auditoria (MVP 4.2.D)
- **Log Explorer:** Tela exclusiva para administradores monitorarem eventos como `FILE_DOWNLOADED` e `DOCUMENT_PUBLISHED`.
- **Inspeção de Metadados:** Visualização de detalhes técnicos (JSON) via Popovers reativos.

---

## ⚙️ Configuração e Execução

### Pré-requisitos
- **Node.js:** v20+
- **Angular CLI:** `npm install -g @angular/cli`
- **Backend:** O serviço [GED Core API](https://github.com/dhensouza/ged-core) deve estar ativo na porta `8080`.

### Passo a Passo
1. Instale as dependências:
   ```bash npm install```
2. Inicie o servidor de desenvolvimento:

```npm start```

3. Acesse: http://localhost:4200

Nota sobre Proxy: O projeto está configurado via proxy.conf.json para redirecionar automaticamente chamadas de /api para o backend Java, evitando erros de CORS.

## 🔑 Credenciais de Acesso 

Para validar o controle de permissões (**RBAC**) e as funcionalidades exclusivas de cada nível de acesso, utilize as contas abaixo:
  
| Perfil | Usuário | Senha | Acessos Exclusivos |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin` | `admin123` | Gestão de Usuários e Trilha de Auditoria |
| **USER** | `dhenSouza` | `user123` | Gestão de Documentos e Upload de Versões |

> **Dica de Teste:** Ao logar como **ADMIN**, note que o menu lateral e as ações de edição de usuários estarão visíveis. Ao logar como **USER**, essas opções são ocultadas automaticamente pela lógica de Signals e Guards do Angular.

## 🧪 Estratégia de Testes
A suíte de testes foi desenhada para garantir a estabilidade do pipeline de CI/CD:

# Executar testes unitários (Vitest)
```ng test```

Cobertura Principal:
Services: Validação de contratos com a API REST.

Guards: Proteção de rotas administrativas contra acesso não autorizado.

Interceptors: Garantia de que o Token JWT está presente em todos os cabeçalhos.

Mocks: Uso de HttpClientTestingModule e MessageService mocks para isolamento de componentes.

* **src/app/**
    * **components/**: Componentes Standalone (Documentos, Auditoria, Diálogos).
    * **services/**: Serviços de integração com a API Spring Boot.
    * **models/**: Interfaces TypeScript (UserResponse, DocumentResponse).
    * **guards/**: Lógica de proteção de rotas (Auth/Admin).
    * **interceptors/**: Interceptação de requisições para anexar o JWT.
    * **styles/**: Global SCSS e customização de temas PrimeNG.

---
### 🔍 Verificação de Auditoria (MVP 4.2.D)

O sistema registra automaticamente todas as ações críticas para garantir a integridade e rastreabilidade dos documentos. Para testar o fluxo completo:

1. Realize o **Login** com qualquer usuário.
2. Execute ações como: **Criar um Documento**, **Fazer Upload de uma Nova Versão** ou **Baixar um Arquivo**.
3. Acesse a conta de **ADMIN** (`admin/admin123`).
4. Navegue até o menu **Auditoria**.

**O que você verá:**
- Registro em tempo real de eventos como `DOCUMENT_CREATED`, `FILE_UPLOADED` e `FILE_DOWNLOADED`.
- O nome do usuário que realizou a ação e o *timestamp* exato.
- O campo **Metadata (JSON)** contendo detalhes técnicos da operação, visualizável através do Popover interativo que implementamos.
---

## 🧠 Decisões de Projeto
* Shared Models: As interfaces do Angular espelham rigorosamente os Records do Java 21 para evitar inconsistências de dados.

* Performance: Optou-se por Signals em vez de Zone.js para garantir que a interface responda de forma síncrona aos eventos do usuário.

* Segurança: O tenantId e as permissões são gerenciados via claims do JWT, garantindo o isolamento lógico exigido pelo desafio.

## 🛠 Troubleshooting (Resolução de Problemas)

### O Front-end não consegue falar com o Back-end?
Se você receber erros de **Connection Refused** ou **404** ao tentar fazer login:

1.  **Verifique o Proxy:** Certifique-se de que o backend está rodando em `http://localhost:8080`. O arquivo `proxy.conf.json` deve estar assim:
    ```json
    {
      "/api": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true
      }
    }
    ```
2.  **Status do Backend:** No terminal do Spring Boot, verifique se não houve erro de conexão com o **PostgreSQL** ou **MinIO** via Docker.
3.  **Logs do Vite:** O terminal onde o `ng serve` está rodando costuma mostrar erros de proxy em tempo real. Fique atento a mensagens de `[proxy] error`.

Desenvolvido por DhenSouza
