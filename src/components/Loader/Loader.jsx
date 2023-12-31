import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="tomato"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        visible={true}
      />
    </>
  );
};