import {useEffect,useState} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
function App() {

  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(true);
  const [term,setTerm] = useState('anime');
  useEffect(()=>{
  fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=${term}&image_type=photo`)
  .then((res)=> res.json())
  .then((data)=> {
   setImages(data.hits);
   setLoading(false);
  })
  .catch((e)=> console.log(e))},[term]);

  return (
    <div className="container mx-auto my-4">
      <ImageSearch setText={(text)=>{setTerm(text)}}/>
      
        {!loading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found!!!</h1>}
        {loading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
        :
        <div className="grid grid-cols-3 gap-4">
        {
          
          images.map((image,index)=> <ImageCard key={image.id+index} tags={image.tags} user={image.user} url={image.webformatURL} downloads={image.downloads} views={image.views} likes={image.likes}/>)
    
        }
      </div>
        }
      
    </div>
  );
}

export default App;
