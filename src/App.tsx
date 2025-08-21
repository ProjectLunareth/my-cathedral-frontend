import React, { useEffect, useState, useRef } from 'react'
import {
  BarChart3Icon,
  AlertTriangleIcon,
  ClipboardCheckIcon,
  SettingsIcon,
  NetworkIcon,
  DownloadIcon,
  UsersIcon,
  ServerIcon,
  ClipboardListIcon,
  BellIcon,
  CloudIcon,
  ShieldAlertIcon,
  ArrowUpRightIcon,
  Loader2Icon,
  RefreshCwIcon,
  PieChartIcon,
  BarChart2Icon,
  ChevronDownIcon,
  AtomIcon,
} from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import CathedralExperience from './components/CathedralExperience'
// Types
type Violation = {
  id: number
  severity: string
  category: string
  description: string
  status: string
  age: string
}
type ComplianceFramework = {
  framework: string
  compliant: number
  critical: number
  major: number
  minor: number
}
type ChartData = {
  name: string
  value: number
  color: string
}
export function App() {
  // State management
  const [currentTab, setCurrentTab] = useState('overview')
  const [userRole, setUserRole] = useState('securityAnalyst')
  const [violationsData, setViolationsData] = useState<Violation[]>([])
  const [complianceData, setComplianceData] = useState<ComplianceFramework[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isPrinting, setIsPrinting] = useState(false)
  // PDF export functionality
  const complianceReportRef = useRef<HTMLDivElement>(null)
  // Enhanced PDF export with react-to-print
  const handlePrintComplianceReport = useReactToPrint({
    content: () => complianceReportRef.current,
    documentTitle: `Compliance-Report-${new Date().toISOString().split('T')[0]}`,
    onBeforeGetContent: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .print-break {
          page-break-after: always;
        }
        .print-hide {
          display: none;
        }
      }
    `,
  })
  // Helper function for RBAC
  const shouldShow = (requiredRoles: string[]) =>
    requiredRoles.includes(userRole)
  // Calculate risk metrics
  const calculateRiskMetrics = () => {
    if (violationsData.length === 0)
      return {
        securityScore: 100,
        riskLevel: 'Low',
      }
    const critical =
      violationsData.filter((v) => v.severity === 'High').length * 10
    const medium =
      violationsData.filter((v) => v.severity === 'Medium').length * 5
    const low = violationsData.filter((v) => v.severity === 'Low').length * 2
    const securityScore = Math.max(
      0,
      100 - Math.min(critical + medium + low, 100),
    )
    const riskLevel =
      securityScore >= 80 ? 'Low' : securityScore >= 60 ? 'Medium' : 'High'
    return {
      securityScore,
      riskLevel,
    }
  }
  // Enhanced chart data
  const getSeverityDistribution = (): ChartData[] => {
    const high = violationsData.filter((v) => v.severity === 'High').length
    const medium = violationsData.filter((v) => v.severity === 'Medium').length
    const low = violationsData.filter((v) => v.severity === 'Low').length
    return [
      {
        name: 'High',
        value: high,
        color: '#dc2626',
      },
      {
        name: 'Medium',
        value: medium,
        color: '#ea580c',
      },
      {
        name: 'Low',
        value: low,
        color: '#d97706',
      },
    ]
  }
  const getComplianceDistribution = (): ChartData[] => {
    if (complianceData.length === 0) return []
    return complianceData.map((framework) => ({
      name: framework.framework,
      value: framework.compliant,
      color:
        framework.compliant >= 90
          ? '#16a34a' // green
          : framework.compliant >= 75
            ? '#facc15' // yellow
            : '#dc2626', // red
    }))
  }
  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated API calls with loading delay
        setTimeout(() => {
          setViolationsData([
            {
              id: 1,
              severity: 'High',
              category: 'Data Protection',
              description: 'Unencrypted PII data in staging environment',
              status: 'Open',
              age: '3 days',
            },
            {
              id: 2,
              severity: 'Medium',
              category: 'Access Control',
              description: 'Excessive admin privileges in production',
              status: 'In Progress',
              age: '1 week',
            },
            {
              id: 3,
              severity: 'High',
              category: 'Infrastructure',
              description: 'Critical patches missing on web servers',
              status: 'Open',
              age: '2 days',
            },
            {
              id: 4,
              severity: 'Low',
              category: 'Policy',
              description: 'Password policy not enforced on test accounts',
              status: 'Resolved',
              age: '2 weeks',
            },
            {
              id: 5,
              severity: 'Medium',
              category: 'Network Security',
              description: 'Firewall rules too permissive on DMZ',
              status: 'Open',
              age: '5 days',
            },
          ])
          setComplianceData([
            {
              framework: 'GDPR',
              compliant: 87,
              critical: 2,
              major: 5,
              minor: 8,
            },
            {
              framework: 'PCI DSS',
              compliant: 92,
              critical: 1,
              major: 3,
              minor: 5,
            },
            {
              framework: 'HIPAA',
              compliant: 79,
              critical: 3,
              major: 7,
              minor: 12,
            },
            {
              framework: 'SOC 2',
              compliant: 84,
              critical: 0,
              major: 6,
              minor: 9,
            },
            {
              framework: 'ISO 27001',
              compliant: 91,
              critical: 1,
              major: 4,
              minor: 6,
            },
          ])
          setIsLoading(false)
        }, 1200)
      } catch (error) {
        console.error('Data fetch failed', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  // Risk metrics
  const { securityScore, riskLevel } = calculateRiskMetrics()
  const riskColor =
    securityScore >= 80 ? 'green' : securityScore >= 60 ? 'orange' : 'red'
  // Tabs configuration
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3Icon className="w-4 h-4 mr-2" />,
    },
    {
      id: 'violations',
      label: 'Violations',
      icon: <AlertTriangleIcon className="w-4 h-4 mr-2" />,
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: <ClipboardCheckIcon className="w-4 h-4 mr-2" />,
    },
    {
      id: 'cathedral',
      label: 'Cathedral',
      icon: <AtomIcon className="w-4 h-4 mr-2" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon className="w-4 h-4 mr-2" />,
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: <NetworkIcon className="w-4 h-4 mr-2" />,
    },
  ]
  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }
  // Simple chart component for visualization
  const SimpleChart = ({
    data,
    type = 'bar',
  }: {
    data: ChartData[]
    type?: 'bar' | 'pie'
  }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    if (type === 'pie' && total > 0) {
      return (
        <div className="relative w-full h-40">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {data.map((item, index) => {
                const percentage = item.value / total
                const degrees = percentage * 360
                const offset = data
                  .slice(0, index)
                  .reduce((sum, d) => sum + (d.value / total) * 360, 0)
                return (
                  <div
                    key={item.name}
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((offset + degrees) * Math.PI) / 180)}% ${50 - 50 * Math.sin(((offset + degrees) * Math.PI) / 180)}%, ${50 + 50 * Math.cos((offset * Math.PI) / 180)}% ${50 - 50 * Math.sin((offset * Math.PI) / 180)}%)`,
                      backgroundColor: item.color,
                    }}
                  />
                )
              })}
              <div
                className="absolute inset-0 flex items-center justify-center bg-white rounded-full"
                style={{
                  transform: 'scale(0.7)',
                }}
              ></div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full flex justify-center">
            <div className="flex space-x-4">
              {data.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-1"
                    style={{
                      backgroundColor: item.color,
                    }}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    // Default bar chart
    const maxValue = Math.max(...data.map((item) => item.value), 1)
    return (
      <div className="flex flex-col space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center">
            <div className="w-20 text-xs text-gray-600">{item.name}</div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            </div>
            <div className="w-8 text-right text-xs text-gray-600 ml-2">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    )
  }
  // Handle Cathedral tab separately
  if (currentTab === 'cathedral') {
    return <CathedralExperience />
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Security Risk Scorer
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="pl-8 pr-4 py-1 border border-blue-300 rounded-lg text-sm bg-blue-50 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="executive">Executive</option>
                  <option value="securityAnalyst">Security Analyst</option>
                  <option value="complianceOfficer">Compliance Officer</option>
                </select>
                <UsersIcon className="w-4 h-4 absolute left-3 top-2 text-blue-600" />
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center transition-colors"
                onClick={handleRefresh}
              >
                <RefreshCwIcon
                  className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`}
                />
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab navigation */}
        <div className="flex overflow-x-auto border-b border-gray-200 mb-6 pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex-shrink-0 flex items-center px-4 py-2 text-sm font-medium transition-colors ${currentTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2Icon className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading security data...</p>
            </div>
          </div>
        )}

        {/* Tab content */}
        {!isLoading && currentTab === 'overview' && (
          <div className="space-y-6">
            {/* Security score card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Security Posture Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">
                    Security Score
                  </h3>
                  <div className="text-4xl font-bold text-blue-800">
                    {securityScore}/100
                  </div>
                  <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${securityScore}%`,
                      }}
                    ></div>
                  </div>
                </div>
                {/* Risk level */}
                <div
                  className={`bg-gradient-to-br ${riskColor === 'green' ? 'from-green-50 to-green-100' : riskColor === 'orange' ? 'from-orange-50 to-orange-100' : 'from-red-50 to-red-100'} rounded-lg p-6 text-center`}
                >
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Risk Level
                  </h3>
                  <div
                    className={`text-2xl font-bold ${riskColor === 'green' ? 'text-green-700' : riskColor === 'orange' ? 'text-orange-700' : 'text-red-700'}`}
                  >
                    {riskLevel}
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div
                      className={`w-3 h-3 rounded-full ${riskColor === 'green' ? 'bg-green-500' : riskColor === 'orange' ? 'bg-orange-500' : 'bg-red-500'} animate-pulse`}
                    ></div>
                  </div>
                </div>
                {/* Open violations */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Open Violations
                  </h3>
                  <div className="text-4xl font-bold text-gray-900">
                    {violationsData.filter((v) => v.status === 'Open').length}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {
                      violationsData.filter((v) => v.status === 'In Progress')
                        .length
                    }{' '}
                    in progress
                  </p>
                </div>
              </div>
            </div>
            {/* Enhanced visualization section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Security Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                    <BarChart2Icon className="w-4 h-4 mr-1" />
                    Violation Severity Distribution
                  </h3>
                  <SimpleChart data={getSeverityDistribution()} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                    <PieChartIcon className="w-4 h-4 mr-1" />
                    Compliance Status
                  </h3>
                  <SimpleChart data={getComplianceDistribution()} type="pie" />
                </div>
              </div>
            </div>
            {/* Compliance summary */}
            {shouldShow([
              'securityAnalyst',
              'complianceOfficer',
              'executive',
            ]) && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Compliance Summary
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Framework
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Compliance %
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Critical Issues
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Major Issues
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Minor Issues
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {complianceData.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.framework}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <span className="mr-2">{item.compliant}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${item.compliant >= 90 ? 'bg-green-500' : item.compliant >= 75 ? 'bg-yellow-400' : 'bg-red-500'}`}
                                  style={{
                                    width: `${item.compliant}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">
                            {item.critical}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-orange-600 font-medium">
                            {item.major}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-yellow-600 font-medium">
                            {item.minor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Security investment priorities - only shown to certain roles */}
            {shouldShow(['securityAnalyst', 'complianceOfficer']) && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Security Investment Priorities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-red-800">
                      Data Protection
                    </h4>
                    <p className="text-sm text-red-600 mt-1">High priority</p>
                    <div className="mt-2 w-full bg-red-200 rounded-full h-2">
                      <div
                        className="h-2 bg-red-500 rounded-full transition-all duration-500"
                        style={{
                          width: '85%',
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-red-700 mt-2">
                      3 critical issues
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-orange-800">
                      Access Control
                    </h4>
                    <p className="text-sm text-orange-600 mt-1">
                      Medium priority
                    </p>
                    <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                      <div
                        className="h-2 bg-orange-500 rounded-full transition-all duration-500"
                        style={{
                          width: '65%',
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-orange-700 mt-2">
                      2 major issues
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-yellow-800">
                      Network Security
                    </h4>
                    <p className="text-sm text-yellow-600 mt-1">
                      Medium priority
                    </p>
                    <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
                      <div
                        className="h-2 bg-yellow-500 rounded-full transition-all duration-500"
                        style={{
                          width: '60%',
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-yellow-700 mt-2">
                      1 open violation
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-green-800">
                      Application Security
                    </h4>
                    <p className="text-sm text-green-600 mt-1">Low priority</p>
                    <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                      <div
                        className="h-2 bg-green-500 rounded-full transition-all duration-500"
                        style={{
                          width: '40%',
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-green-700 mt-2">Compliant</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && currentTab === 'violations' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Security Violations
              </h2>
              <div className="flex gap-2">
                <span className="text-sm text-gray-600">
                  {violationsData.filter((v) => v.status === 'Open').length}{' '}
                  open,
                  {
                    violationsData.filter((v) => v.status === 'In Progress')
                      .length
                  }{' '}
                  in progress
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:table-cell hidden">
                      Description
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    {shouldShow(['securityAnalyst']) && (
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {violationsData.map((violation) => (
                    <tr
                      key={violation.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        #{violation.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${violation.severity === 'High' ? 'bg-red-100 text-red-800' : violation.severity === 'Medium' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {violation.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {violation.category}
                      </td>
                      <td
                        className="px-4 py-3 text-sm text-gray-900 sm:table-cell hidden max-w-md truncate"
                        title={violation.description}
                      >
                        {violation.description}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${violation.status === 'Open' ? 'bg-red-100 text-red-800' : violation.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                        >
                          {violation.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {violation.age}
                      </td>
                      {shouldShow(['securityAnalyst']) && (
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 mr-2 transition-colors">
                            Edit
                          </button>
                          <button className="text-green-600 hover:text-green-800 transition-colors">
                            Resolve
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && currentTab === 'compliance' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Compliance Reports
              </h2>
              <button
                onClick={handlePrintComplianceReport}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors print-hide"
                disabled={isPrinting}
              >
                {isPrinting ? (
                  <>
                    <Loader2Icon className="w-4 h-4 mr-1 animate-spin" />
                    Preparing PDF...
                  </>
                ) : (
                  <>
                    <DownloadIcon className="w-4 h-4 mr-1" />
                    Export PDF Report
                  </>
                )}
              </button>
            </div>
            <div ref={complianceReportRef} className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Company information for the report */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Organization Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Organization Name
                          </p>
                          <p className="font-medium">Acme Corporation</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Report Date</p>
                          <p className="font-medium">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Security Contact
                          </p>
                          <p className="font-medium">security@acmecorp.com</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Compliance Officer
                          </p>
                          <p className="font-medium">Jane Smith</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                      <span className="text-xs text-gray-500">LOGO</span>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Executive Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">
                        Security Score
                      </h4>
                      <p className="text-2xl font-bold text-blue-900">
                        {securityScore}/100
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-orange-800 mb-1">
                        Risk Level
                      </h4>
                      <p
                        className={`text-xl font-bold ${riskColor === 'green' ? 'text-green-600' : riskColor === 'orange' ? 'text-orange-600' : 'text-red-600'}`}
                      >
                        {riskLevel}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-red-800 mb-1">
                        Critical Issues
                      </h4>
                      <p className="text-xl font-bold text-red-600">
                        {complianceData.reduce(
                          (sum, item) => sum + item.critical,
                          0,
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    The organization's overall security posture is{' '}
                    <span className="font-medium">{riskLevel}</span> risk level.
                    Immediate attention is required for critical issues across
                    compliance frameworks.
                  </p>
                </div>

                {/* Compliance frameworks */}
                <div className="space-y-6">
                  {complianceData.map((framework, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-6 print-break"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {framework.framework} Compliance
                      </h3>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Overall Compliance
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {framework.compliant}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${framework.compliant >= 90 ? 'bg-green-600' : framework.compliant >= 75 ? 'bg-yellow-400' : 'bg-red-600'}`}
                            style={{
                              width: `${framework.compliant}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Critical Issues
                            </span>
                            <span className="text-lg font-bold text-red-600">
                              {framework.critical}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Major Issues
                            </span>
                            <span className="text-lg font-bold text-orange-600">
                              {framework.major}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Minor Issues
                            </span>
                            <span className="text-lg font-bold text-yellow-600">
                              {framework.minor}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="mb-2">
                          {framework.framework} compliance status is{' '}
                          <span
                            className={`font-medium ${framework.compliant >= 90 ? 'text-green-600' : framework.compliant >= 75 ? 'text-yellow-600' : 'text-red-600'}`}
                          >
                            {framework.compliant}%
                          </span>
                          .
                        </p>
                        <p>
                          {framework.critical > 0
                            ? `${framework.critical} critical issues require immediate remediation.`
                            : 'No critical compliance issues detected.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && currentTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Dashboard Settings
            </h2>
            <div className="space-y-6">
              {/* Settings sections */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Risk Assessment Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Risk Calculation Method
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>NIST 800-30</option>
                      <option>OWASP Risk Assessment</option>
                      <option>Custom Formula</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Refresh Interval
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>Every 6 hours</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-alerts"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="email-alerts"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Email alerts for critical violations
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="slack-alerts"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="slack-alerts"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Slack notifications for all violations
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="weekly-report"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="weekly-report"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Weekly summary report
                    </label>
                  </div>
                </div>
              </div>
              {shouldShow(['securityAnalyst']) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Advanced Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        API Key
                      </label>
                      <input
                        type="password"
                        value="••••••••••••••••"
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Webhook URL
                      </label>
                      <input
                        type="text"
                        value="https://api.example.com/webhook"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && currentTab === 'integrations' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Security Tool Integrations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 'splunk',
                  name: 'Splunk',
                  description: 'SIEM integration for real-time alerting',
                  logo: (
                    <div className="bg-purple-100 text-purple-800 p-3 rounded-lg">
                      <ServerIcon className="w-8 h-8" />
                    </div>
                  ),
                },
                {
                  id: 'jira',
                  name: 'Jira',
                  description: 'Automated ticket creation for violations',
                  logo: (
                    <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
                      <ClipboardListIcon className="w-8 h-8" />
                    </div>
                  ),
                },
                {
                  id: 'slack',
                  name: 'Slack',
                  description: 'Real-time notifications and alerts',
                  logo: (
                    <div className="bg-green-100 text-green-800 p-3 rounded-lg">
                      <BellIcon className="w-8 h-8" />
                    </div>
                  ),
                },
                {
                  id: 'aws',
                  name: 'AWS Security Hub',
                  description: 'Cloud security findings integration',
                  logo: (
                    <div className="bg-orange-100 text-orange-800 p-3 rounded-lg">
                      <CloudIcon className="w-8 h-8" />
                    </div>
                  ),
                },
                {
                  id: 'tenable',
                  name: 'Tenable.io',
                  description: 'Vulnerability scanning integration',
                  logo: (
                    <div className="bg-red-100 text-red-800 p-3 rounded-lg">
                      <ShieldAlertIcon className="w-8 h-8" />
                    </div>
                  ),
                },
                {
                  id: 'custom',
                  name: 'Custom Webhook',
                  description: 'Build your own integration',
                  logo: (
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <SettingsIcon className="w-8 h-8" />
                    </div>
                  ),
                },
              ].map((integration) => (
                <div
                  key={integration.id}
                  className="border rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    {integration.logo}
                    <h3 className="font-semibold text-lg text-gray-900 ml-4">
                      {integration.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    {integration.description}
                  </p>
                  <button className="w-full py-2 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Configure Integration
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                API Integration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-700 mb-2">Webhook URL:</p>
                  <div className="flex">
                    <input
                      type="text"
                      value={`https://api.securescorer.com/webhook/${btoa('your-company-id')}`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-blue-300 rounded-l-lg text-sm"
                    />
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-lg text-sm hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        // In a real app, we would use navigator.clipboard.writeText here
                        alert('URL copied to clipboard!')
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-blue-700 mb-2">Documentation:</p>
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    API Reference Guide{' '}
                    <ArrowUpRightIcon className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Security Risk Scorer. All rights
              reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
