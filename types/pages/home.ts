import { HomePagePropertyResource } from 'types/resources/Property';
import { BlogResource } from 'types/resources/Blog';

export type HomePageProps = {
  properties: HomePagePropertyResource[];
  blogs: BlogResource[];
};
