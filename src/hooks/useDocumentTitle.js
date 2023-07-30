import { useEffect } from 'react';

export function useDocumentTitle(title) {
  const defaultTitle = 'Neighbourly | All-in-one Property Management Solution';
  useEffect(
    function () {
      document.title = title + ' | Neighboutly';

      return () => (document.title = defaultTitle);
    },
    [title]
  );
}
