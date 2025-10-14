import dynamic from 'next/dynamic';
import { CircularProgress, Box } from '@mui/material';

const HomeComponent = dynamic(() => import('./Home'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  ),
});

export default function Page() {
  return <HomeComponent />;
}