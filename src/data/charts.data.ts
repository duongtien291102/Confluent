export const mockChartData = {
  taskStatus: [
    { status: 'Todo', count: 12, color: '#3b82f6' },
    { status: 'In Progress', count: 8, color: '#f97316' },
    { status: 'Review', count: 5, color: '#8b5cf6' },
    { status: 'Done', count: 25, color: '#22c55e' },
    { status: 'Overdue', count: 3, color: '#ef4444' }
  ],
  priorityCount: [
    { priority: 'High', count: 3, color: '#ef4444' },
    { priority: 'Medium', count: 4, color: '#f97316' },
    { priority: 'Low', count: 2, color: '#22c55e' },
    { priority: 'None', count: 1, color: '#6b7280' }
  ],
  alerts: [
    {
      id: '1',
      taskCode: 'UIUX001',
      projectCode: 'PRJ-001',
      message: 'trễ hạn'
    },
    {
      id: '2',
      taskCode: '0012911',
      projectCode: 'PRJ-002',
      message: 'hoàn thành'
    },
    {
      id: '3',
      taskCode: 'TESTING001',
      projectCode: 'PRJ-003',
      message: 'sắp đến hạn'
    },
    {
      id: '4',
      taskCode: 'DATABASE001',
      projectCode: 'PRJ-004',
      message: 'đang thực hiện'
    },
    {
      id: '5',
      taskCode: 'DOCUMENTATION001',
      projectCode: 'PRJ-005',
      message: 'chưa bắt đầu'
    },
    {
      id: '6',
      taskCode: 'FRONTEND001',
      projectCode: 'PRJ-006',
      message: 'cần review gấp'
    },
    {
      id: '7',
      taskCode: 'BACKEND002',
      projectCode: 'PRJ-007',
      message: 'thiếu tài nguyên'
    },
    {
      id: '8',
      taskCode: 'DESIGN001',
      projectCode: 'PRJ-008',
      message: 'đã hoàn thành'
    }
  ],
  productivity: [
    { month: 'JAN', target: 4000, actual: 2400 },
    { month: 'FEB', target: 3000, actual: 1398 },
    { month: 'MAR', target: 2000, actual: 9800 },
    { month: 'APR', target: 2780, actual: 3908 },
    { month: 'MAY', target: 1890, actual: 4800 },
    { month: 'JUN', target: 2390, actual: 3800 },
    { month: 'JUL', target: 3490, actual: 4300 },
    { month: 'AUG', target: 2000, actual: 2400 },
    { month: 'SEP', target: 3000, actual: 2400 },
    { month: 'OCT', target: 2000, actual: 1400 },
    { month: 'NOV', target: 3000, actual: 4400 },
    { month: 'DEC', target: 4000, actual: 2400 }
  ]
};