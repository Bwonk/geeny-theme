/**
 * Group-scoped single-open accordion bus.
 * Multiple FAQ sections on one page stay independent via groupId.
 */

type Listener = () => void;

type GroupState = {
  openKey: string | null;
  listeners: Set<Listener>;
};

const groups = new Map<string, GroupState>();

function ensureGroup(groupId: string): GroupState {
  let group = groups.get(groupId);
  if (!group) {
    group = { openKey: null, listeners: new Set() };
    groups.set(groupId, group);
  }
  return group;
}

export function getFaqOpenKey(groupId: string): string | null {
  return groups.get(groupId)?.openKey ?? null;
}

export function isFaqOpen(groupId: string, itemKey: string): boolean {
  return getFaqOpenKey(groupId) === itemKey;
}

/** Opens itemKey, or closes it if already open (toggle). Notifies all listeners in the group. */
export function toggleFaqItem(groupId: string, itemKey: string): void {
  const group = ensureGroup(groupId);
  group.openKey = group.openKey === itemKey ? null : itemKey;
  group.listeners.forEach((listener) => listener());
}

export function subscribeFaqGroup(groupId: string, listener: Listener): () => void {
  const group = ensureGroup(groupId);
  group.listeners.add(listener);
  return () => {
    group.listeners.delete(listener);
    if (group.listeners.size === 0) {
      groups.delete(groupId);
    }
  };
}
