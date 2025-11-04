'use client';

interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  color: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
  bidirectional?: boolean;
  style?: 'solid' | 'dashed';
}

interface ArchitectureDiagramProps {
  title: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  width?: number;
  height?: number;
}

export default function ArchitectureDiagram({
  title,
  nodes,
  connections,
  width = 800,
  height = 400
}: ArchitectureDiagramProps) {
  const nodeWidth = 140;
  const nodeHeight = 80;

  // Find node position by id
  const getNodeCenter = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return {
      x: node.x + (node.width || nodeWidth) / 2,
      y: node.y + (node.height || nodeHeight) / 2,
    };
  };

  // Create arrow path between two nodes
  const createPath = (from: string, to: string) => {
    const fromCenter = getNodeCenter(from);
    const toCenter = getNodeCenter(to);

    // Simple straight line for now
    return `M ${fromCenter.x} ${fromCenter.y} L ${toCenter.x} ${toCenter.y}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 mb-6 border border-gray-200">
      <h4 className="text-lg font-semibold mb-4 text-gray-900">{title}</h4>
      <div className="bg-white rounded-lg p-4 shadow-sm overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Define arrow markers */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#3B82F6" />
            </marker>
            <marker
              id="arrowhead-bidirectional"
              markerWidth="10"
              markerHeight="10"
              refX="1"
              refY="3"
              orient="auto"
            >
              <polygon points="10 0, 0 3, 10 6" fill="#3B82F6" />
            </marker>
          </defs>

          {/* Render connections first (behind nodes) */}
          {connections.map((conn, idx) => {
            const fromCenter = getNodeCenter(conn.from);
            const toCenter = getNodeCenter(conn.to);
            const midX = (fromCenter.x + toCenter.x) / 2;
            const midY = (fromCenter.y + toCenter.y) / 2;

            return (
              <g key={`conn-${idx}`}>
                {/* Connection line */}
                <line
                  x1={fromCenter.x}
                  y1={fromCenter.y}
                  x2={toCenter.x}
                  y2={toCenter.y}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray={conn.style === 'dashed' ? '5,5' : '0'}
                  markerEnd="url(#arrowhead)"
                  markerStart={conn.bidirectional ? "url(#arrowhead-bidirectional)" : ""}
                  opacity="0.7"
                />

                {/* Connection label */}
                {conn.label && (
                  <g>
                    <rect
                      x={midX - 40}
                      y={midY - 12}
                      width="80"
                      height="24"
                      fill="white"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                      rx="4"
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      textAnchor="middle"
                      className="text-xs font-medium"
                      fill="#6B7280"
                    >
                      {conn.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Render nodes */}
          {nodes.map((node) => {
            const w = node.width || nodeWidth;
            const h = node.height || nodeHeight;

            return (
              <g key={node.id}>
                {/* Node background with gradient */}
                <defs>
                  <linearGradient id={`grad-${node.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: node.color, stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: node.color, stopOpacity: 0.7 }} />
                  </linearGradient>
                </defs>

                {/* Node rectangle */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={w}
                  height={h}
                  fill={`url(#grad-${node.id})`}
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  rx="8"
                  className="hover:stroke-blue-500 transition-colors cursor-pointer"
                />

                {/* Icon */}
                {node.icon && (
                  <text
                    x={node.x + w / 2}
                    y={node.y + 25}
                    textAnchor="middle"
                    className="text-2xl"
                  >
                    {node.icon}
                  </text>
                )}

                {/* Node label */}
                <text
                  x={node.x + w / 2}
                  y={node.y + (node.icon ? 45 : 35)}
                  textAnchor="middle"
                  className="text-sm font-bold"
                  fill="white"
                >
                  {node.label.length > 16 ? (
                    <>
                      <tspan x={node.x + w / 2} dy="0">{node.label.substring(0, 16)}</tspan>
                      <tspan x={node.x + w / 2} dy="14">{node.label.substring(16)}</tspan>
                    </>
                  ) : (
                    node.label
                  )}
                </text>

                {/* Node sublabel */}
                {node.sublabel && (
                  <text
                    x={node.x + w / 2}
                    y={node.y + h - 12}
                    textAnchor="middle"
                    className="text-xs"
                    fill="white"
                    opacity="0.9"
                  >
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
