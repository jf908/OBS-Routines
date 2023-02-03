import { offset, flip, shift } from '@floating-ui/dom';
import { createFloatingActions } from 'svelte-floating-ui';

export const createTooltip = () =>
  createFloatingActions({
    strategy: 'absolute',
    placement: 'top',
    middleware: [offset(6), flip(), shift()],
  });
