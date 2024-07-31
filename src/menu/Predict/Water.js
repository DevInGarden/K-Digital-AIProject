import React, { useState, useEffect } from 'react';
import ReactFlow, { Controls, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import getNodes from './nodes.js';
import defaultEdges from './edges.js';
import { num } from '../../RecoilAtom.js';
import { useRecoilState } from 'recoil';
import { nodeTypes } from './nodeTypes.js';
import { getEdgesToNode } from './setedge.js';
import '../../css/node.css';

function Water() {
  const [visibleEdges, setVisibleEdges] = useState([]);
  const [allEdges, setAllEdges] = useState(true);
  // const [fdata, setFdata] = useState([]);
  const [snum, setSnum] = useRecoilState(num);
  const [swater, setSwater] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const edgeOptions = {
    animated: true,
    style: {
      stroke: '#00FFE0',
      strokeWidth: 5,
    },
  };

  const handleNodeClick = (event, node) => {
    if (node.id === '1') {
      setAllEdges(true);
      setVisibleEdges([]);
    } else {
      setAllEdges(false);
      setVisibleEdges(getEdgesToNode(node.id));
    }
    setSnum(node.id);
    setSwater(node.data.label.charAt(0));
  };

  const fetchData = async () => {
    const url = "http://10.125.121.225:8080/getWaterLastHeight";

    try {
      const resp = await fetch(url);
      console.log("res", resp);
      if (resp.ok) {
        const data = await resp.json();
        const roundedData = data.map(value => Math.round(value * 10) / 10);
        setNodes(getNodes(roundedData));
        console.log("rounded data", roundedData);
      } else {
        console.error('Failed to fetch data:', resp.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    setSnum(0);
  }, []);

  return (
    <div className='w-full h-full'>
      <ReactFlow
        nodes={nodes}
        edges={allEdges ? edges : visibleEdges}
        defaultEdgeOptions={edgeOptions}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        nodesDraggable>
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Water;
