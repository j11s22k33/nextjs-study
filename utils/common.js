import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * ```
 * // 예제 1
 * const [cnt, callbackWrapperSetState] = useStateCallbackWrapper(0)
 *
 * callbackWrapperSetState({
 *    setState: oldState => oldState+1,
 *    useLayoutEffect: newState => console.log(newState),
 *    useEffect: newState => console.log(newState)
 * })
 *
 * // 예제 2 - 기존처럼 사용하기
 * const [cnt, callbackWrapperSetState] = useStateCallbackWrapper(0)
 *
 * useEffect(() => {
 *    console.log(cnt)
 * }, [cnt])
 *
 * callbackWrapperSetState({
 *    setState: oldState => oldState+1,
 * })
 * ```
 * @param initialState
 * @returns [state, callbackWrapperSetState]
 */
const $emptyFn = (state) => {};
const useStateCallbackWrapper = (initialState = undefined) => {
  const [$state, $setState] = useState(initialState);
  const $cb = useRef({ effect: $emptyFn, layoutEffect: $emptyFn });

  useLayoutEffect(() => {
    $cb.current.layoutEffect($state);
  }, [$state]);

  useEffect(() => {
    $cb.current.effect($state);
  }, [$state]);

  function $callbackWrapperSetState({
    setState = undefined,
    useLayoutEffect = $emptyFn,
    useEffect = $emptyFn
  }) {
    $cb.current.effect = useEffect;
    $cb.current.layoutEffect = useLayoutEffect;
    $setState(setState);
  }

  return [$state, $callbackWrapperSetState];
};

export { useStateCallbackWrapper };
