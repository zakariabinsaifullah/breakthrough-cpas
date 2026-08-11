# Taste
- Wants new code to follow the existing codebase style and conventions ("follow my existing codebase style"). Confidence: 0.9
- Prefers implementing features as extensions of core blocks (e.g., core/paragraph, core/heading) rather than custom blocks — asked for a responsive-alignment extension and a Highlight extension. Confidence: 0.6
- Likes responsive/breakpoint-aware settings for spacing and gap attributes in blocks (e.g., responsive item-gap and icon-gap controls). Confidence: 0.6
- When rebranding or renaming across a project, expects the change applied consistently everywhere in the theme, not partially. Confidence: 0.7
- Wants the agent to ask for clarification when it encounters issues during a task, rather than guessing or silently deciding ("If you find any issues, ASK me"). Confidence: 0.9
- Communicates in terse, numbered task lists with direct imperatives. Confidence: 0.6
- References code locations by @-mentioning file/directory paths (e.g., "@src/blocks/timeline/") rather than describing them in prose. Confidence: 0.5
- Prefers per-item spacing (e.g., `padding-bottom` on each item) over `flex gap` on the parent container when each item carries its own connector/`::before` styling, and expects the last item to drop the connector. Confidence: 0.5
