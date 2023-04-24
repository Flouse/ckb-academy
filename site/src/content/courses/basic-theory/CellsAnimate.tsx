import Cells from '~/assets/images/courses/cells.png';

const CellsAnimate = () => {
  return (
    <div
      class="bg-cover bg-center"
      style={{
        'background-image':
          'url(https://images.pexels.com/photos/4719340/pexels-photo-4719340.jpeg?auto=compress&cs=tinysrgb&w=1600)',
      }}
    >
      <img src={Cells} class="w-full" />
    </div>
  );
};

export default CellsAnimate;
