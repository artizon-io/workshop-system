import { createMachine } from "xstate";

const useMachine = () => createMachine({
  id: 'status',
  initial: 'waiting',
  states: {
    waiting: {
      on: {
        POPULATE: { target: 'normal' },
      }
    },
    normal: {
      on: {
        VALIDATE: { target: 'loading' },
        UNPOPULATE: { target: 'waiting' }
      }
    },
    error: {
      on: {
        POPULATE: { target: 'normal' },
        UNPOPULATE: { target: 'waiting' },
      }
    },
    loading: {
      on: {
        RESOLVE: { target: 'success' },
        REJECT: { target: 'error' }
      }
    },
    success: {
      type: 'final'
    }
  }
});