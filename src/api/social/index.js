import { deepCopy } from 'src/utils/deep-copy';
import { connections, feed, posts, profile } from './data';

class SocialApi {
  getProfile() {
    return Promise.resolve(deepCopy(profile));
  }

  getConnections() {
    return Promise.resolve(deepCopy(connections));
  }

  getPosts() {
    return Promise.resolve(deepCopy(posts));
  }

  getFeed() {
    return Promise.resolve(deepCopy(feed));
  }
}

export const socialApi = new SocialApi();
