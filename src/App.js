import {useEffect,useState} from 'react';
import ImageCard from './components/ImageCard';

function App() {

  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
  fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=yellow+flowers&image_type=photo`)
  .then((res)=> res.json())
  .then((data)=> {
   setImages(data.hits);
   setLoading(false);
  })
  .catch((e)=> console.log(e))},[]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {
          images.map((image,index)=> <ImageCard key={image.id+index} tags={image.tags} user={image.user} url={image.webformatURL} downloads={image.downloads} views={image.views} likes={image.likes}/>)
        }
      </div>
    </div>
  );
}

export default App;
