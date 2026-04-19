'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  GitBranch,
  History,
  Globe,
  KeyRound,
  Container,
  Server,
  Split,
  Activity,
  Monitor,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Cpu,
  MemoryStick,
  Zap,
  ExternalLink,
  RefreshCw,
  Plus,
  Trash2,
  Play,
  Pause,
} from 'lucide-react';

type TabKey = 'deploy' | 'versions' | 'domains' | 'envvars' | 'containers' | 'abtests' | 'services' | 'health';

interface Tab {
  key: TabKey;
  label: string;
  icon: typeof Rocket;
}

const tabs: Tab[] = [
  { key: 'deploy', label: 'Dağıtım', icon: Rocket },
  { key: 'versions', label: 'Versiyonlar', icon: History },
  { key: 'domains', label: 'Domainler', icon: Globe },
  { key: 'envvars', label: 'Env Değişkenleri', icon: KeyRound },
  { key: 'containers', label: 'Konteynerler', icon: Container },
  { key: 'abtests', label: 'A/B Testleri', icon: Split },
  { key: 'services', label: 'Servisler', icon: Server },
  { key: 'health', label: 'Sağlık', icon: Activity },
];

const demoVersions = [
  { id: '1', version: 'v3', status: 'running', deployedAt: '2026-04-19 10:30', commit: 'feat: Add new dashboard widgets' },
  { id: '2', version: 'v2', status: 'stopped', deployedAt: '2026-04-18 14:20', commit: 'fix: Resolve login redirect issue' },
  { id: '3', version: 'v1', status: 'rolled_back', deployedAt: '2026-04-17 09:15', commit: 'Initial deployment' },
];

const demoDomains = [
  { id: '1', domain: 'demo.workpanel.com', status: 'verified', sslStatus: 'active' },
  { id: '2', domain: 'app.example.com', status: 'pending', sslStatus: 'pending' },
];

const demoEnvVars = [
  { id: '1', key: 'DATABASE_URL', value: 'postgresql://...', scope: 'runtime', isSecret: true },
  { id: '2', key: 'API_KEY', value: 'sk_live_...', scope: 'project', isSecret: true },
  { id: '3', key: 'NEXT_PUBLIC_APP_URL', value: 'https://demo.workpanel.com', scope: 'build', isSecret: false },
];

const demoContainers = [
  { id: 'container-1', name: 'demo-v3-abc123', image: 'workpanel/demo:v3', status: 'running', port: 3000, cpu: 12, memory: 256 },
  { id: 'container-2', name: 'demo-v2-def456', image: 'workpanel/demo:v2', status: 'exited', port: 3000, cpu: 0, memory: 0 },
];

const demoABTests = [
  { id: '1', name: 'Homepage Redesign', versionA: 'v3', versionB: 'v2', trafficSplitA: 50, trafficSplitB: 50, status: 'active', visitors: 1250, conversions: 89 },
];

const demoServices = [
  { id: '1', name: 'Redis Cache', type: 'redis', status: 'running', url: 'redis://redis:6379', port: 6379 },
  { id: '2', name: 'PostgreSQL DB', type: 'postgres', status: 'running', url: 'postgres://postgres:5432', port: 5432 },
];

const demoHealthMetrics = {
  uptime: 99.98,
  responseTime: 145,
  cpuUsage: 23,
  memoryUsage: 412,
  requestsPerMin: 1250,
  errorRate: 0.02,
};

function DeploymentPanel() {
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">GitHub Repository</h3>
              <p className="text-sm text-muted-foreground">github.com/workpanel/demo-app</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Bağlı
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GitBranch className="w-4 h-4" />
          <span>main</span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Deploy Et</h3>
        <div className="flex items-center gap-3">
          <select className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm">
            <option>main</option>
            <option>develop</option>
            <option>feature/new-ui</option>
          </select>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isDeploying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Deploy Ediliyor...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4" /> Deploy Et
              </>
            )}
          </button>
        </div>

        {isDeploying && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Build Ediliyor...</span>
              <span className="text-primary">45%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '45%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VersionHistory() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Versiyon Geçmişi</h3>
      </div>
      <div className="divide-y divide-border">
        {demoVersions.map((version, index) => (
          <div key={version.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                version.status === 'running' ? 'bg-green-500 text-white' :
                version.status === 'stopped' ? 'bg-gray-400 text-white' :
                'bg-yellow-500 text-white'
              }`}>
                {index + 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{version.version}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    version.status === 'running' ? 'bg-green-500/10 text-green-600' :
                    version.status === 'stopped' ? 'bg-gray-500/10 text-gray-600' :
                    'bg-yellow-500/10 text-yellow-600'
                  }`}>
                    {version.status === 'running' ? 'Aktif' : version.status === 'stopped' ? 'Durduruldu' : 'Geri Alındı'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{version.commit}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{version.deployedAt}</span>
              {version.status !== 'running' && (
                <button className="px-3 py-1 text-xs border border-border rounded-lg hover:bg-muted transition-colors">
                  Geri Al
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DomainManager() {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Özel Domainler</h3>
          <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg flex items-center gap-1 hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Ekle
          </button>
        </div>
        <div className="divide-y divide-border">
          {demoDomains.map((domain) => (
            <div key={domain.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{domain.domain}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      domain.status === 'verified' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                    }`}>
                      {domain.status === 'verified' ? 'Doğrulandı' : 'Beklemede'}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      domain.sslStatus === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                    }`}>
                      SSL: {domain.sslStatus === 'active' ? 'Aktif' : 'Beklemede'}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnvVarManager() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Çevre Değişkenleri</h3>
        <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg flex items-center gap-1 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Ekle
        </button>
      </div>
      <div className="divide-y divide-border">
        {demoEnvVars.map((envVar) => (
          <div key={envVar.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <KeyRound className={`w-5 h-5 ${envVar.isSecret ? 'text-yellow-500' : 'text-muted-foreground'}`} />
              <div>
                <p className="font-medium">{envVar.key}</p>
                <p className="text-sm text-muted-foreground font-mono">{envVar.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs bg-muted rounded">{envVar.scope}</span>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContainerManager() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Docker Konteynerler</h3>
      </div>
      <div className="divide-y divide-border">
        {demoContainers.map((container) => (
          <div key={container.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Container className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{container.name}</p>
                  <p className="text-sm text-muted-foreground">{container.image}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  container.status === 'running' ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-600'
                }`}>
                  {container.status === 'running' ? 'Çalışıyor' : 'Durduruldu'}
                </span>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  {container.status === 'running' ? (
                    <Pause className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Play className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Port</p>
                <p className="font-medium">{container.port}</p>
              </div>
              <div>
                <p className="text-muted-foreground">CPU</p>
                <p className="font-medium">{container.cpu}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Memory</p>
                <p className="font-medium">{container.memory}MB</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ABTestDashboard() {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">A/B Testleri</h3>
          <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg flex items-center gap-1 hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Yeni Test
          </button>
        </div>
        {demoABTests.map((test) => (
          <div key={test.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">{test.name}</p>
                <p className="text-sm text-muted-foreground">Version A vs Version B</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-500/10 text-green-600 rounded-full">
                {test.status === 'active' ? 'Aktif' : 'Durduruldu'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Version A ({test.versionA})</span>
                  <span className="text-sm text-primary">{test.trafficSplitA}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${test.trafficSplitA}%` }} />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Ziyaretçi</p>
                    <p className="font-medium">{test.visitors / 2}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dönüşüm</p>
                    <p className="font-medium">{test.conversions / 2}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Version B ({test.versionB})</span>
                  <span className="text-sm text-primary">{test.trafficSplitB}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${test.trafficSplitB}%` }} />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Ziyaretçi</p>
                    <p className="font-medium">{test.visitors / 2}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dönüşüm</p>
                    <p className="font-medium">{Math.ceil(test.conversions / 2)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
                Duraklat
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Kazananı Belirle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesList() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Proje Servisleri</h3>
        <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg flex items-center gap-1 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Servis Ekle
        </button>
      </div>
      <div className="divide-y divide-border">
        {demoServices.map((service) => (
          <div key={service.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  service.type === 'redis' ? 'bg-red-500/10' : 'bg-blue-500/10'
                }`}>
                  <Server className={`w-5 h-5 ${service.type === 'redis' ? 'text-red-500' : 'text-blue-500'}`} />
                </div>
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs bg-green-500/10 text-green-600 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Çalışıyor
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">URL</p>
                <p className="font-mono text-xs truncate">{service.url}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Port</p>
                <p className="font-medium">{service.port}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthMonitor() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Uptime</span>
          </div>
          <p className="text-2xl font-bold text-green-500">{demoHealthMetrics.uptime}%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Yanıt Süresi</span>
          </div>
          <p className="text-2xl font-bold">{demoHealthMetrics.responseTime}ms</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">CPU</span>
          </div>
          <p className="text-2xl font-bold">{demoHealthMetrics.cpuUsage}%</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MemoryStick className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Memory</span>
          </div>
          <p className="text-2xl font-bold">{demoHealthMetrics.memoryUsage}MB</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Grafik</h3>
        <div className="h-48 flex items-end gap-2">
          {[65, 45, 78, 52, 89, 43, 67, 72, 58, 81, 76, 69].map((height, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors relative group">
              <div
                className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                style={{ height: `${height}%` }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border border-border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {height} req/min
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>24:00</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dakika Başı İstek</span>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-1">{demoHealthMetrics.requestsPerMin}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hata Oranı</span>
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-1 text-green-500">{demoHealthMetrics.errorRate}%</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('deploy');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'deploy':
        return <DeploymentPanel />;
      case 'versions':
        return <VersionHistory />;
      case 'domains':
        return <DomainManager />;
      case 'envvars':
        return <EnvVarManager />;
      case 'containers':
        return <ContainerManager />;
      case 'abtests':
        return <ABTestDashboard />;
      case 'services':
        return <ServicesList />;
      case 'health':
        return <HealthMonitor />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Workpanel Demo</h1>
                <p className="text-sm text-muted-foreground">Tüm özelliklerin gösterimi</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm font-medium rounded-full flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Proje Aktif
              </span>
              <a
                href="#"
                className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" /> Canlı Önizleme
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl mb-8 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}