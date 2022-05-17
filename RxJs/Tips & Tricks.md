## Use finalize for side effects on completion

- if you unsibscribe observable from subscription, a complete callback will be ignored
- complete callback evoked only of ibservable completes naturally
- **finalyze()** - invokes in all cases
