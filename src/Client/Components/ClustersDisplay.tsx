import React, { useState, useEffect, FC } from 'react';

import '../Styles/clustersdisplay.css'

interface ClustersDisplayProps {
  clusterData: FileData[][];
  handleHoverMicroservice: (microservice: string | null) => void; // Update this line
}

interface GroupedData {
  [microservice: string]: string[];
}

interface FileData {
  fileName: string;
  // Add other properties as needed
}



const ClustersDisplay: FC<ClustersDisplayProps> = ({ clusterData, handleHoverMicroservice }) => {
  const [groupedData, setGroupedData] = useState<GroupedData>({});

  useEffect(() => {
    if (clusterData) {
      // Group the data based on the inner arrays
      const grouped = clusterData.reduce((acc, group, index) => {
        const groupName = `Microservice ${index + 1}`;
        acc[groupName] = group.map((item) => item.fileName);
        return acc;
      }, {} as GroupedData);
      setGroupedData(grouped);
    }
  }, [clusterData]);

  const handleMouseEnter = (microservice: string) => {
    handleHoverMicroservice(microservice);
  };

  const handleMouseLeave = () => {
    handleHoverMicroservice(null);
  };

  // Render the grouped data
  return (
    <div>
      <h2>Repository Overview</h2>
      {Object.entries(groupedData).map(([microservice, files]) => (
         <div key={microservice} className='cluster' onMouseEnter={() => handleMouseEnter(microservice)} onMouseLeave={handleMouseLeave}>
          <h3>{microservice}</h3>
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClustersDisplay;
