import { requestJson } from './apiClient';

export type BookmarkItemType = 'newsletter' | 'policy';

interface BookmarkResponse {
  item_type: BookmarkItemType;
  item_id: number;
}

interface BookmarkListResponse {
  items: BookmarkResponse[];
}

export async function fetchBookmarks(userId: string) {
  const data = await requestJson<BookmarkListResponse>(
    `/users/${userId}/bookmarks`
  );
  return data.items;
}

export async function addBookmark(
  userId: string,
  itemType: BookmarkItemType,
  itemId: number
) {
  await requestJson(`/users/${userId}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      item_type: itemType,
      item_id: itemId
    })
  });
}

export async function removeBookmark(
  userId: string,
  itemType: BookmarkItemType,
  itemId: number
) {
  await requestJson(`/users/${userId}/bookmarks/${itemType}/${itemId}`, {
    method: 'DELETE'
  });
}
