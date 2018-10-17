module.exports = function(babel) {
    var t = babel.types;

    return {
        visitor: {
            ArrayExpression: function(path) {
                path.traverse({
                    SpreadElement: function(pathSpread) {
                        var argument = pathSpread.node.argument;

                        if (
                            argument.type === 'LogicalExpression' &&
                            argument.right.type === 'ArrayExpression' &&
                            !argument.right.elements.length
                        ) {
                            return;
                        }

                        pathSpread.replaceWith(
                            t.spreadElement(t.logicalExpression('||', argument, t.arrayExpression())),
                        );
                    },
                });
            },
        },
    };
};
