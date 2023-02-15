import LoadingOrError from '@/components/LoadingOrError';
import { setToken } from '@/http/token';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Cas: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token')
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setToken(token);
      navigate('/');
    }
  }, [token])
  return (
    <div className='bg-white min-h-screen flex'>
      <div className='flex-auto flex justify-center'>
        <Spin indicator={<LoadingOrError />} />
      </div>
		</div>
  )
}

export default Cas;
