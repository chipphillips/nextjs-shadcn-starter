# Dashboard and Data Visualization Typography Guidelines

## 1. Data Display Typography

### Numerical Values

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'stat-lg': ['2rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        'stat-base': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        'stat-sm': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
      },
      fontFamily: {
        // Tabular numbers for consistent width
        numeric: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
}
```

#### Implementation Classes

```css
@layer components {
  .dashboard-stat-primary {
    @apply font-numeric text-stat-lg font-semibold tabular-nums tracking-tight text-gray-900 dark:text-gray-100;
  }
  
  .dashboard-stat-secondary {
    @apply font-numeric text-stat-base font-medium tabular-nums text-gray-700 dark:text-gray-300;
  }
  
  .dashboard-stat-tertiary {
    @apply font-numeric text-stat-sm font-normal tabular-nums text-gray-600 dark:text-gray-400;
  }
  
  .dashboard-metric-change-positive {
    @apply font-numeric text-sm font-medium text-green-600 dark:text-green-400;
  }
  
  .dashboard-metric-change-negative {
    @apply font-numeric text-sm font-medium text-red-600 dark:text-red-400;
  }
}
```

### Chart Typography

```typescript
// Typography configuration for charts
const chartTypography = {
  title: {
    font: {
      family: 'Inter',
      size: 16,
      weight: 600,
      lineHeight: 1.4,
    },
    padding: {
      bottom: 16,
    },
  },
  axis: {
    font: {
      family: 'Inter',
      size: 12,
      weight: 400,
    },
    color: 'rgb(107, 114, 128)', // text-gray-500
  },
  tooltip: {
    font: {
      family: 'Inter',
      size: 13,
      weight: 500,
    },
  },
  legend: {
    font: {
      family: 'Inter',
      size: 13,
      weight: 500,
    },
  },
}
```

#### Chart Component Example

```tsx
interface ChartTypographyProps {
  title?: string;
  data: any[];
  height?: number;
  width?: number;
}

export const LineChart = ({ title, data, height = 300, width = 600 }: ChartTypographyProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        {title && (
          <text
            x={width / 2}
            y={20}
            textAnchor="middle"
            className="fill-gray-900 dark:fill-gray-100"
            style={{
              fontSize: chartTypography.title.font.size,
              fontWeight: chartTypography.title.font.weight,
              fontFamily: chartTypography.title.font.family,
            }}
          >
            {title}
          </text>
        )}
        <XAxis
          tick={{
            fontSize: chartTypography.axis.font.size,
            fontFamily: chartTypography.axis.font.family,
            fill: chartTypography.axis.color,
          }}
        />
        <YAxis
          tick={{
            fontSize: chartTypography.axis.font.size,
            fontFamily: chartTypography.axis.font.family,
            fill: chartTypography.axis.color,
          }}
        />
        <Tooltip
          contentStyle={{
            fontSize: chartTypography.tooltip.font.size,
            fontFamily: chartTypography.tooltip.font.family,
            fontWeight: chartTypography.tooltip.font.weight,
          }}
        />
        <Legend
          wrapperStyle={{
            fontSize: chartTypography.legend.font.size,
            fontFamily: chartTypography.legend.font.family,
            fontWeight: chartTypography.legend.font.weight,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
```

## 2. Dashboard Layout Typography

### Section Headers

```typescript
// Dashboard section header component
interface DashboardSectionProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const DashboardSection = ({ title, subtitle, action }: DashboardSectionProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};
```

### Data Card Typography

```typescript
interface DataCardProps {
  title: string;
  value: number | string;
  change?: number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const DataCard = ({ title, value, change, subtitle, trend }: DataCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </div>
      <div className="mt-2 flex items-baseline">
        <div className="dashboard-stat-primary">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {change && (
          <span className={cn(
            "ml-2",
            trend === 'up' ? 'dashboard-metric-change-positive' : 'dashboard-metric-change-negative'
          )}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      {subtitle && (
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {subtitle}
        </div>
      )}
    </div>
  );
};
```

## 3. Data Table Typography

```typescript
// Table typography styles
const tableTypography = {
  header: 'text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
  cell: 'text-sm text-gray-900 dark:text-gray-100',
  numeric: 'font-numeric tabular-nums text-right',
}

interface DataTableProps {
  columns: Array<{
    header: string;
    accessor: string;
    isNumeric?: boolean;
  }>;
  data: any[];
}

export const DataTable = ({ columns, data }: DataTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={cn(
                  'px-6 py-3',
                  tableTypography.header,
                  column.isNumeric && tableTypography.numeric
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className={cn(
                    'px-6 py-4 whitespace-nowrap',
                    tableTypography.cell,
                    column.isNumeric && tableTypography.numeric
                  )}
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## 4. KPI and Metric Display

```typescript
// KPI component with different size variants
interface KPIDisplayProps {
  label: string;
  value: number | string;
  size?: 'sm' | 'md' | 'lg';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

const kpiSizes = {
  sm: {
    label: 'text-xs',
    value: 'text-2xl',
    trend: 'text-xs',
  },
  md: {
    label: 'text-sm',
    value: 'text-3xl',
    trend: 'text-sm',
  },
  lg: {
    label: 'text-base',
    value: 'text-4xl',
    trend: 'text-base',
  },
}

export const KPIDisplay = ({
  label,
  value,
  size = 'md',
  trend
}: KPIDisplayProps) => {
  return (
    <div className="flex flex-col">
      <div className={cn(
        'text-gray-500 dark:text-gray-400 font-medium',
        kpiSizes[size].label
      )}>
        {label}
      </div>
      <div className={cn(
        'font-numeric font-semibold text-gray-900 dark:text-gray-100 tabular-nums tracking-tight',
        kpiSizes[size].value
      )}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {trend && (
        <div className={cn(
          'flex items-center mt-1',
          kpiSizes[size].trend,
          trend.direction === 'up'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        )}>
          {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
};
```

## 5. Best Practices

### Numeric Values Display

1. **Always use tabular numbers**
   - Ensures numbers align properly in columns
   - Prevents layout shifts when values change

   ```css
   .numeric-value {
     font-feature-settings: "tnum";
     font-variant-numeric: tabular-nums;
   }
   ```

2. **Number Formatting**
   - Use appropriate decimal places
   - Add thousand separators
   - Consider locale-specific formatting

   ```typescript
   const formatNumber = (value: number, decimals = 0) => {
     return new Intl.NumberFormat('en-US', {
       minimumFractionDigits: decimals,
       maximumFractionDigits: decimals,
     }).format(value);
   };
   ```

### Accessibility Guidelines

1. **Color Contrast**
   - Ensure sufficient contrast for all text
   - Use darker shades for important numbers
   - Provide alternative text for charts

2. **Font Sizing**
   - Minimum 12px for data labels
   - 14px for regular text
   - 16px or larger for important metrics

3. **Screen Reader Support**

   ```typescript
   // Example of accessible chart label
   <text
     role="heading"
     aria-level={2}
     className="chart-title"
   >
     {title}
   </text>
   ```

## 6. Implementation Guide

1. Add typography configurations to your Tailwind config
2. Import and use provided components
3. Customize styles to match your brand
4. Test across different screen sizes
5. Validate accessibility compliance
6. Add responsive variations as needed

## 7. Responsive Considerations

```typescript
// Responsive typography for different screen sizes
fontSize: {
  'stat-lg': [
    '2rem',
    {
      lineHeight: '2.25rem',
      letterSpacing: '-0.02em',
      '@screen sm': {
        fontSize: '2.5rem',
        lineHeight: '2.75rem',
      },
      '@screen lg': {
        fontSize: '3rem',
        lineHeight: '3.25rem',
      },
    },
  ],
}
```
