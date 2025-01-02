'use client';

import dynamic from 'next/dynamic';
import { Latlng } from '@/utils/types'; // ปรับเส้นทางตามที่คุณใช้

// ใช้ dynamic import เพื่อโหลด MapLandmark
const DynamicMapLandmark = dynamic(() => import('@/components/map/MapLandmark'), { ssr: false });

interface MapLandmarkClientProps {
  location?: { lat: number; lng: number };
}

const MapLandmarkClient: React.FC<MapLandmarkClientProps> = ({ location }) => {
  return <DynamicMapLandmark location={location} />;
};

export default MapLandmarkClient;
