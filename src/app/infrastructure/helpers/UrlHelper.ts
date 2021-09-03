export class UrlHelper {
  static combineFragments(...paths: string[]) {
    const rawUrl = paths.join('/');
    const urlFragments = rawUrl.split('/').filter(fragment => fragment);

    return `/${ urlFragments.join('/') }/`;
  }
}
