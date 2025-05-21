import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Link to='/login'>Login</Link>
      <Link to='/rooms'>Rooms</Link>
      <Link to='/guests'>Guests</Link>
      <Button>Shadcn Button</Button>
    </div>
  );
};

export default Home;
