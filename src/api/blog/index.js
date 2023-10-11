import { deepCopy } from 'src/utils/deep-copy';

import { post, posts } from './data';

class BlogApi {
  getPosts() {
    return Promise.resolve(deepCopy(posts));
  }

  getPost() {
    return Promise.resolve(deepCopy(post));
  }
}

export const blogApi = new BlogApi();
