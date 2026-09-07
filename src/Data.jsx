// import house images
import House1 from './assets/image/houses/house1.png';
import House2 from './assets/image/houses/house2.png';
import House3 from './assets/image/houses/house3.png';
import House4 from './assets/image/houses/house4.png';
import House5 from './assets/image/houses/house5.png';
import House6 from './assets/image/houses/house6.png';
import House7 from './assets/image/houses/house7.png';
import House8 from './assets/image/houses/house8.png';
import House9 from './assets/image/houses/house9.png';
import House10 from './assets/image/houses/house10.png';
import House11 from './assets/image/houses/house11.png';
import House12 from './assets/image/houses/house12.png';
// import house large images
import House1Lg from './assets/image/houses/house1lg.png';
import House2Lg from './assets/image/houses/house2lg.png';
import House3Lg from './assets/image/houses/house3lg.png';
import House4Lg from './assets/image/houses/house4lg.png';
import House5Lg from './assets/image/houses/house5lg.png';
import House6Lg from './assets/image/houses/house6lg.png';
import House7Lg from './assets/image/houses/house7lg.png';
import House8Lg from './assets/image/houses/house8lg.png';
import House9Lg from './assets/image/houses/house9lg.png';
import House10Lg from './assets/image/houses/house10lg.png';
import House11Lg from './assets/image/houses/house11lg.png';
import House12Lg from './assets/image/houses/house12lg.png';

// import apartments images
import Apartment1 from './assets/image/apartments/a1.png';
import Apartment2 from './assets/image/apartments/a2.png';
import Apartment3 from './assets/image/apartments/a3.png';
import Apartment4 from './assets/image/apartments/a4.png';
import Apartment5 from './assets/image/apartments/a5.png';
import Apartment6 from './assets/image/apartments/a6.png';
// import apartments large images
import Apartment1Lg from './assets/image/apartments/a1lg.png';
import Apartment2Lg from './assets/image/apartments/a2lg.png';
import Apartment3Lg from './assets/image/apartments/a3lg.png';
import Apartment4Lg from './assets/image/apartments/a4lg.png';
import Apartment5Lg from './assets/image/apartments/a5lg.png';
import Apartment6Lg from './assets/image/apartments/a6lg.png';

// import agents images
import Agent1 from './assets/image/agents/agent1.png';
import Agent2 from './assets/image/agents/agent2.png';
import Agent3 from './assets/image/agents/agent3.png';
import Agent4 from './assets/image/agents/agent4.png';
import Agent5 from './assets/image/agents/agent5.png';
import Agent6 from './assets/image/agents/agent6.png';
import Agent7 from './assets/image/agents/agent7.png';
import Agent8 from './assets/image/agents/agent8.png';
import Agent9 from './assets/image/agents/agent9.png';
import Agent10 from './assets/image/agents/agent10.png';
import Agent11 from './assets/image/agents/agent11.png';
import Agent12 from './assets/image/agents/agent12.png';


import { listings } from '../shared/listings.js'
const images = { House1, House2, House3, House4, House5, House6, House7, House8, House9, House10, House11, House12, House1Lg, House2Lg, House3Lg, House4Lg, House5Lg, House6Lg, House7Lg, House8Lg, House9Lg, House10Lg, House11Lg, House12Lg, Apartment1, Apartment2, Apartment3, Apartment4, Apartment5, Apartment6, Apartment1Lg, Apartment2Lg, Apartment3Lg, Apartment4Lg, Apartment5Lg, Apartment6Lg, Agent1, Agent2, Agent3, Agent4, Agent5, Agent6, Agent7, Agent8, Agent9, Agent10, Agent11, Agent12 }
export const housesData = listings.map((house) => ({ ...house, image: images[house.image], imageLg: images[house.imageLg], agent: { ...house.agent, image: images[house.agent.image] } }))
