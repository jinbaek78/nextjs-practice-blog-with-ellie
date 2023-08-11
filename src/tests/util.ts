export async function resolvedComponent(
  Component: (props?: any) => Promise<JSX.Element>,
  props?: any
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}
