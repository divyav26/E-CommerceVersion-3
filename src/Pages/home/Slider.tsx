import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; // Import the CSS for styling

const Slider = () => {
  const handleDragStart = (e: any) => e.preventDefault();

  const items = [
    <div className="card" onDragStart={handleDragStart} role="presentation">
      <img
        src="https://i.ytimg.com/vi/41MVPsMQchI/maxresdefault.jpg"
        alt="Image 1"
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">Card 1</h2>
        <p className="text-sm text-gray-600">This is the description for Card 1.</p>
      </div>
    </div>,
    <div className="card" onDragStart={handleDragStart} role="presentation">
      <img
        src="https://via.placeholder.com/300"
        alt="Image 2"
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">Card 2</h2>
        <p className="text-sm text-gray-600">This is the description for Card 2.</p>
      </div>
    </div>,
    <div className="card" onDragStart={handleDragStart} role="presentation">
      <img
        src="https://via.placeholder.com/400"
        alt="Image 3"
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">Card 3</h2>
        <p className="text-sm text-gray-600">This is the description for Card 3.</p>
      </div>
    </div>,
  ];

  return (
    <div className="w-full h-full">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },
          1024: { items: 3 },
        }}
        autoPlay
        autoPlayInterval={2000}
        infinite
        disableDotsControls
        disableButtonsControls
      />
    </div>
  );
};

export default Slider;
