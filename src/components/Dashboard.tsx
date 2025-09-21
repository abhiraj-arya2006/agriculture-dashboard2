import React, { useState, useEffect } from 'react';
import { 
  Bell, Menu, X, MapPin, TrendingUp, AlertTriangle, 
  Download, Leaf, Droplets, Bug, Thermometer,
  BarChart3, Map, Settings, Home, Search, User,
  ChevronDown, Activity, Calendar, Moon, Sun,
  Filter, MoreVertical, Zap, Shield, Target
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';


const mockTemporalData = [
  { date: 'Jan', ndvi: 0.65, moisture: 72, temperature: 18, nutrients: 85, yield: 2.1 },
  { date: 'Feb', ndvi: 0.72, moisture: 68, temperature: 22, nutrients: 82, yield: 2.3 },
  { date: 'Mar', ndvi: 0.78, moisture: 75, temperature: 25, nutrients: 88, yield: 2.8 },
  { date: 'Apr', ndvi: 0.82, moisture: 71, temperature: 28, nutrients: 90, yield: 3.2 },
  { date: 'May', ndvi: 0.79, moisture: 65, temperature: 31, nutrients: 87, yield: 3.0 },
  { date: 'Jun', ndvi: 0.85, moisture: 70, temperature: 29, nutrients: 92, yield: 3.5 }
];

const mockAlerts = [
  { id: 1, type: 'critical', message: 'Severe drought detected in Field A-3', time: '2 min ago', severity: 'high', location: 'Field A-3' },
  { id: 2, type: 'warning', message: 'Pest risk elevated in Section B-2', time: '15 min ago', severity: 'medium', location: 'Section B-2' },
  { id: 3, type: 'info', message: 'Irrigation cycle completed successfully', time: '1 hour ago', severity: 'low', location: 'All Fields' },
  { id: 4, type: 'warning', message: 'Soil moisture below optimal threshold', time: '2 hours ago', severity: 'medium', location: 'Field C-1' }
];

const mockSoilData = [
  { id: 1, location: 'Field A-1', ph: 6.8, moisture: 72, nitrogen: 85, phosphorus: 78, potassium: 92, health: 'excellent' },
  { id: 2, location: 'Field A-2', ph: 7.2, moisture: 68, nitrogen: 82, phosphorus: 85, potassium: 88, health: 'good' },
  { id: 3, location: 'Field B-1', ph: 6.5, moisture: 75, nitrogen: 90, phosphorus: 72, potassium: 85, health: 'good' },
  { id: 4, location: 'Field B-2', ph: 7.0, moisture: 71, nitrogen: 88, phosphorus: 80, potassium: 90, health: 'excellent' },
  { id: 5, location: 'Field C-1', ph: 6.2, moisture: 45, nitrogen: 65, phosphorus: 68, potassium: 72, health: 'poor' },
  { id: 6, location: 'Field C-2', ph: 6.9, moisture: 78, nitrogen: 87, phosphorus: 83, potassium: 89, health: 'excellent' }
];

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [notifications, setNotifications] = useState(mockAlerts);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const getAlertIcon = (type: string): React.ReactNode => {
    switch(type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Bell className="w-4 h-4 text-blue-500 dark:text-cyan-400" />;
    }
  };

  const getSeverityStyles = (severity: string): string => {
    switch(severity) {
      case 'high': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300';
      case 'medium': return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300';
      default: return 'bg-blue-50 dark:bg-cyan-900/20 border-blue-200 dark:border-cyan-800 text-blue-800 dark:text-cyan-300';
    }
  };

  const getHealthColor = (health: string): string => {
    switch(health) {
      case 'excellent': return 'text-emerald-600 dark:text-emerald-400';
      case 'good': return 'text-green-600 dark:text-green-400';
      case 'fair': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-red-600 dark:text-red-400';
    }
  };

  const downloadReport = (format: string): void => {
    alert(`${format.toUpperCase()} Report Generated - This would trigger an actual download in a real implementation`);
  };

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ name: string; value: number | string; color?: string }>;
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const SpectralHealthMap = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <div className="p-2 bg-green-100 dark:bg-emerald-900/30 rounded-lg mr-3">
            <Map className="w-5 h-5 text-green-600 dark:text-emerald-400" />
          </div>
          Spectral Health Map
        </h3>
        <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="relative h-96 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-emerald-900/20 rounded-xl overflow-hidden">
        <div className="absolute inset-0 p-4">
          <div className="grid grid-cols-6 gap-2 h-full">
            {[...Array(24)].map((_, i) => {
              const health = Math.random();
              const getColor = () => {
                if (health > 0.8) return 'bg-emerald-500 dark:bg-emerald-400';
                if (health > 0.6) return 'bg-green-500 dark:bg-green-400';
                if (health > 0.4) return 'bg-yellow-500 dark:bg-yellow-400';
                return 'bg-red-500 dark:bg-red-400';
              };
              
              return (
                <div 
                  key={i} 
                  className={`${getColor()} rounded-lg opacity-80 hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                >
                  {(health * 100).toFixed(0)}%
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">NDVI Health Index</div>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Excellent (80-100%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Good (60-80%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Fair (40-60%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Poor (0-40%)</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute bottom-1/3 left-2/4 w-3 h-3 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
      </div>
    </div>
  );

  const TemporalTrends = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <div className="p-2 bg-blue-100 dark:bg-cyan-900/30 rounded-lg mr-3">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          </div>
          Temporal Analysis
        </h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-cyan-900/30 text-blue-600 dark:text-cyan-400 rounded-lg hover:bg-blue-200 dark:hover:bg-cyan-900/50 transition-colors">
            6M
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            1Y
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Vegetation Health & Moisture</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockTemporalData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
                axisLine={{ stroke: darkMode ? '#4b5563' : '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
                axisLine={{ stroke: darkMode ? '#4b5563' : '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="ndvi" 
                stroke={darkMode ? '#10b981' : '#059669'} 
                strokeWidth={3} 
                dot={{ fill: darkMode ? '#10b981' : '#059669', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="NDVI"
              />
              <Line 
                type="monotone" 
                dataKey="moisture" 
                stroke={darkMode ? '#06b6d4' : '#0284c7'} 
                strokeWidth={3} 
                dot={{ fill: darkMode ? '#06b6d4' : '#0284c7', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="Moisture %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Environmental Conditions</h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockTemporalData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
                axisLine={{ stroke: darkMode ? '#4b5563' : '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }}
                axisLine={{ stroke: darkMode ? '#4b5563' : '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stackId="1" 
                stroke={darkMode ? '#f59e0b' : '#d97706'} 
                fill={darkMode ? 'rgba(245, 158, 11, 0.3)' : 'rgba(217, 119, 6, 0.3)'}
                name="Temperature °C"
              />
              <Area 
                type="monotone" 
                dataKey="nutrients" 
                stackId="2" 
                stroke={darkMode ? '#8b5cf6' : '#7c3aed'} 
                fill={darkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(124, 58, 237, 0.3)'}
                name="Nutrients %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const AnomalyAlerts = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          Active Alerts
        </h3>
        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
          {notifications.length}
        </span>
      </div>
      
      <div className="space-y-4">
        {notifications.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-xl border-l-4 ${getSeverityStyles(alert.severity)} transition-all duration-200 hover:shadow-md group cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">{alert.message}</p>
                  <div className="flex items-center text-xs opacity-70 space-x-3">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {alert.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {alert.time}
                    </span>
                  </div>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-all duration-200">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        <button className="w-full p-3 text-sm font-medium text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-900/20 rounded-xl transition-colors duration-200">
          View All Alerts
        </button>
      </div>
    </div>
  );

  const SoilConditions = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <div className="p-2 bg-green-100 dark:bg-emerald-900/30 rounded-lg mr-3">
            <Leaf className="w-5 h-5 text-green-600 dark:text-emerald-400" />
          </div>
          Soil Health Overview
        </h3>
        <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockSoilData.map((field) => (
          <div 
            key={field.id} 
            className="group p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">{field.location}</h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                field.health === 'excellent' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                field.health === 'good' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                field.health === 'fair' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}>
                {field.health}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  pH Level
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{field.ph}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Moisture
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{field.moisture}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Nitrogen
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{field.nitrogen}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Phosphorus
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{field.phosphorus}%</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    Potassium
                  </span>
                  <span className={`font-semibold ${getHealthColor(field.health)} flex items-center`}>
                    {field.potassium}% 
                    {field.health === 'excellent' && <Zap className="w-3 h-3 ml-1" />}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RiskZones = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
            <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          AI Risk Predictions
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Shield className="w-3 h-3 mr-1" />
            AI Confidence: 94%
          </div>
        </div>
      </div>
      
      <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-xl overflow-hidden">
        <div className="absolute inset-0 p-4">
          <div className="grid grid-cols-8 gap-1 h-full">
            {[...Array(48)].map((_, i) => {
              const risk = Math.random();
              const getColorAndOpacity = () => {
                if (risk > 0.7) return { color: 'bg-red-500 dark:bg-red-400', opacity: 0.8 };
                if (risk > 0.4) return { color: 'bg-yellow-500 dark:bg-yellow-400', opacity: 0.6 };
                return { color: 'bg-green-500 dark:bg-emerald-400', opacity: 0.4 };
              };
              
              const { color, opacity } = getColorAndOpacity();
              
              return (
                <div 
                  key={i} 
                  className={`${color} rounded hover:scale-110 transition-transform duration-200 cursor-pointer`} 
                  style={{ opacity }}
                  title={`Risk Level: ${(risk * 100).toFixed(0)}%`}
                ></div>
              );
            })}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Risk Distribution</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">High Risk</span>
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">12 zones</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Medium Risk</span>
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">18 zones</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Low Risk</span>
              </div>
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">18 zones</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <div className="px-3 py-1 bg-blue-600 dark:bg-cyan-600 text-white text-xs font-medium rounded-full animate-pulse">
            Live Monitoring
          </div>
        </div>
      </div>
    </div>
  );

  const StatsCards = () => {
    const stats = [
      { 
        label: 'Total Fields', 
        value: '24', 
        change: '+2', 
        changeType: 'positive',
        icon: MapPin, 
        color: 'text-blue-600 dark:text-cyan-400',
        bgColor: 'bg-blue-100 dark:bg-cyan-900/30'
      },
      { 
        label: 'Avg NDVI', 
        value: '0.78', 
        change: '+0.05', 
        changeType: 'positive',
        icon: Leaf, 
        color: 'text-green-600 dark:text-emerald-400',
        bgColor: 'bg-green-100 dark:bg-emerald-900/30'
      },
      { 
        label: 'Active Alerts', 
        value: '4', 
        change: '-2', 
        changeType: 'positive',
        icon: AlertTriangle, 
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-900/30'
      },
      { 
        label: 'Soil Health', 
        value: '87%', 
        change: '+3%', 
        changeType: 'positive',
        icon: Activity, 
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30'
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-3xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{stat.value}</p>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last week</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-300">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  AgriMonitor
                </h1>
              </div>
            )}
            <button 
              onClick={toggleSidebar} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: Home },
            { id: 'maps', label: 'Field Maps', icon: Map },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'alerts', label: 'Alerts', icon: Bell },
            { id: 'reports', label: 'Reports', icon: Download },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeSection === item.id 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'group-hover:scale-110'} transition-transform duration-200`} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group"
          >
            {darkMode ? 
              <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" /> : 
              <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
            }
            {sidebarOpen && (
              <span className="font-medium">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Smart Farm Dashboard</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">AI-powered precision agriculture monitoring</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search fields, alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200"
                />
              </div>

              {/* Export Button */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <button 
                    onClick={() => downloadReport('pdf')}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-xl transition-colors"
                  >
                    📄 PDF Report
                  </button>
                  <button 
                    onClick={() => downloadReport('excel')}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-xl transition-colors"
                  >
                    📊 Excel Report
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-20 transform opacity-0 scale-95 animate-in">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">Recent Alerts</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.slice(0, 3).map((alert) => (
                        <div key={alert.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start space-x-3">
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{alert.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time} • {alert.location}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Farmer</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Farm Manager</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <StatsCards />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <SpectralHealthMap />
            </div>
            <div>
              <AnomalyAlerts />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <TemporalTrends />
            <RiskZones />
          </div>

          <SoilConditions />
        </main>
      </div>
    </div>
  );
};

export default App;
      