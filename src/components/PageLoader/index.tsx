import React, { ReactNode } from 'react';

import { Skeleton, Box } from '@mui/material';

interface PageLoaderComponentOverrides {
  Empty?: JSX.Element;
  Error?: JSX.Element;
}

interface PageLoaderProps {
  isLoading?: boolean;
  error?: string;
  isEmpty?: boolean;
  Components?: PageLoaderComponentOverrides;
  children: ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = false,
  isEmpty = false,
  error,
  Components,
  children,
}): React.ReactElement => {
  if (isLoading) {
    return (
      <Skeleton
        animation="wave"
        height="18rem"
        sx={{ transform: 'none', transformOrigin: 'none' }}
      />
    );
  }

  if (error) {
    return <Box>{Components?.Error}</Box>;
  }

  if (isEmpty) {
    return <Box>{Components?.Empty}</Box>;
  }

  return <>{children}</>;
};

export default PageLoader;
