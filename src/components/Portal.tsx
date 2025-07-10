'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  containerId?: string; // default to 'modal-root'
};

export default function Portal({ children, containerId = 'modal-root' }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById(containerId));
    setMounted(true);
  }, [containerId]);

  return mounted && element ? createPortal(children, element) : null;
}
