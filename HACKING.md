## Websockets and websocket-to-tcp-tunnel

There's a fairly complex setup to Orchil. There are JS (and HTML and CSS) client files served by Apache, and then a separate NGinX web server that forwards websocket connection to websocket-to-tcp-tunnel. Why?

Several reasons.

Apache does a surprisingly poor job handling websockets, and websockets are a very good choice for text-game I/O. It would be possible, but probably not desireable, to adapt websocket-to-tcp-tunnel's configuration to Apache rather than NGinX. It would be possible, but I assume not desireable, to convert Skotos's top-level web server to NGinX instead of Apache.

The amount of resource usage here is minimal in any case -- Apache and NGinX are very efficient and this just isn't a lot of users.

It would be possible to remove NGinX and websocket-to-tcp-tunnel entirely by maintaining a native websocket implementation in DGD. That would mean that any future changes to websockets would require updating the DGD implementation instead of a Nodejs-based implementation, though. So that's probably undesireable too.

## Orchil.js

Orchil.js implements the basic HTML5-based UI client.

### Output and currentSubElements

At any given point, Orchil keeps track of where it is in outputting text to the user via an array called currentSubElements.

In concept, currentSubElements is (inclusively) a stack of open tags. For instance, if Orchil was halfway through outputting a table, the currentSubElements stack might look roughly like this:

[&lt;table&gt;, &lt;tbody&gt;, &lt;tr&gt;, &lt;td&gt;]

Note that the items in currentSubElements would be the actual DOM elements for each of these, not a string or other placeholder.

However, currentSubElements ***also*** holds the prompt after it has been printed so that additional text can be appended after it. I (Noah Gibbs, Sept 2020) have not yet located the mechanism for printing the prompt.
