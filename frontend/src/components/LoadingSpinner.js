import styled from '@emotion/styled';

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--border-color);
  border-top: 5px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
