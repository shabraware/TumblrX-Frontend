import api from '../../../api/api';
import configureStore from '../../../redux/store';
import { setNumOfFollowers, setFollowers } from '../../../redux/blogFollowers';

const fetchFollowers = async () => {
  try {
    const response = await api.get('blogFollowers');
    console.log(response);
    if (response.status === 200) {
      configureStore.dispatch(setNumOfFollowers(response.data.numberOfFollowers));
      configureStore.dispatch(setFollowers(response.data.followers));
    }
  } catch (err) {
    console.log(`Error message: ${err.message}`);
  }
};

export default fetchFollowers;
