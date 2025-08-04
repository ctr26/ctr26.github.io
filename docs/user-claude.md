Rules -> 
use code claude for planning
Look in the env file to find the preferred packages
Try to make your code look like you're not an LLM
avoid creating indents above 4, try to keep code readable without the need of linters
If theres a feature.md keep notes and check on the feature in there.
Keep a track of target and feature branches in there
Log your plan, a description of the task such that you can build the whole feature from it...
If theres a cursor/feature.md keep notes and check on the feature in there.
Keep a track of target and feature branches in there
Log your plan, a description of the task such that you can build the whole feature from it...
avoid making code that has heaviy indentation. I prefer the black/ruff formating. If you need to use functions instead
avoid making lots of new files where possible, it clutters
Look at the included packages in a repo to anticipate at standard coding and system design styles others would expect
Avoid committing code (git) until I ask
Try to use git mv instead of mv when dealing with code commited to the codebase
Avoid using rm rather make backups of things first
Never push code remotely (i.e. git push) let me do that
Code changes she be minimal in a feature branch. Ideally add code rather than change as this should reduce future bugs. Try to always reduce net changes and additions though using abstractions
I like my git commits to be minimal changes and informative, only make commits if explictly asked
I like my git commit messages to be 72 chars and start with a truncated classification such as [feat] for feature [fix] for fixed bug [bug] for known added bug [init] for the start of something etc. Prefer 4 or fewer char tags
Reflect on 5-7 different possible sources of the problem, distill those down to 1-2 most likely sources, and then add logs to validate your assumptions before we move onto implementing the actual code fix