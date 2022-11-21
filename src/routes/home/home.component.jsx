import Directory from '../../components/directory/directory.component';

const Home = () => {
  const categories = [
    {
      id:1,
      title: 'Aari Work', 
      imageUrl: 'https://i.ibb.co/tmnNRcd/aari.jpg',
    },
    {
      id:2,
      title: 'Zardozi Work', 
      imageUrl: 'https://i.ibb.co/6tDd7YJ/zardozi.jpg',
    },
    {
      id:3,
      title: 'Persian Embroidery',
      imageUrl: 'https://i.ibb.co/ctDsFg9/persian.jpg', 
    },
    {
      id:4,
      title: 'Parsi Embroidery',
      imageUrl: 'https://i.ibb.co/bssdGJc/parsi.jpg', 
    },
    {
      id:5,
      title: 'Farisha Embroidery',
      imageUrl: 'https://i.ibb.co/vqBXc6L/farisha.jpg', 
    },
  ];

  return (
    <Directory categories={categories} />
  );
};

export default Home;