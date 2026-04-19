# Workpanel Demo

Workpanel PaaS Platform demo projesi - Tüm yetenekleri göstergen

## Quick Start

```bash
cd demo
npm install
npm run dev
```

## Proje Yapısı

```
demo/
├── src/
│   ├── app/
│   │   ├── globals.css    # Tailwind CSS + Workpanel marka renkleri
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx    # Ana demo sayfası - tüm sekmeler
│   ├── components/     # React bileşenleri (ileride)
│   └── lib/           # Utility fonksiyonları (ileride)
├── public/           # Statik dosyalar
├── Dockerfile         # Multi-stage Docker build
├── workpanel.json    # Platform yapılandırması
├── package.json     # Bağımlılıklar
├── tsconfig.json   # TypeScript yapılandırması
├── tailwind.config.ts
└── postcss.config.js
```

## Kullanılan Teknolojiler

- **Framework**: Next.js 14 (React 18 + TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Demo Sekmeleri

Demo sayfasında 8 sekme bulunur:

| Sekme | Açıklama |
|------|----------|
| Dağıtım | GitHub bağlantısı, branch seçimi, deploy butonu |
| Versiyonlar | Versiyon geçmişi, rollback |
| Domainler | Özel domain yönetimi, SSL durumu |
| Env Değişkenleri | Secret yönetimi |
| Konteynerler | Docker container listesi, CPU/memory |
| A/B Testleri | Traffic split, metrikler |
| Servisler | Redis, PostgreSQL vb. |
| Sağlık | CPU, memory, response time grafikleri |

## API Endpoints

Demo, Workpanel'in tüm API yapısını yansıtır:

```typescript
// Deployment
POST /api/deployments
GET /api/deployments/project/:projectId
GET /api/deployments/:id/status
GET /api/deployments/:id/versions
POST /api/deployments/:id/rollback

// Containers
GET /api/containers/:projectId
POST /api/containers/:id/stop
POST /api/containers/:id/start

// Domains
GET /api/domains/project/:projectId
POST /api/domains
DELETE /api/domains/:id
POST /api/domains/:id/verify

// A/B Tests
GET /api/ab-tests/:projectId
POST /api/ab-tests
PUT /api/ab-tests/:id/split

// Environment Vars
GET /api/env-vars/:projectId
PUT /api/env-vars/:projectId
```

## Veritabanı Tabloları

Demo, Workpanel'in Convex schema yapısını içerir:

- customers
- projects
- phases (4 aşama: Planlama, Geliştirme, Test, Teslimat)
- tasks
- revisions
- files
- deployments
- deployment_versions
- env_variables
- github_integrations
- ab_tests
- ab_test_metrics
- health_metrics
- infrastructure_metrics
- services
- notifications
- custom_domains
- notification_preferences
- operator_profiles
- push_subscriptions
- commit_cache
- milestones
- access_code_attempts
- ai_rate_limits

## Deployment

Docker ile deploy etmek için:

```bash
docker build -t workpanel-demo .
docker run -p 3000:3000 workpanel-demo
```

Veya docker-compose ile:

```yaml
services:
  demo:
    build: ./demo
    ports:
      - "3000:3000"
```

## Platform Yapılandırması

Tüm platform yetenekleri `workpanel.json` dosyasında belgelenmiştir.

Bu dosya şunları içerir:
- Tüm servislerin açıklamaları
- API endpoint leri
- Veritabanı tabloları ve indeksleri
- Deployment aşamaları
- Stack bilgileri (Redis, Traefik, Convex, vb.)
- Gerekli ortam değişkenleri

## Lisans

Private - Tüm hakları saklıdır.