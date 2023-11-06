const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

    thoughtSchema.virtual("reactionCount").get(function () {
        return this.reactions.length;
    });
    

    const Thought = model('Thought', thoughtSchema);
    module.exports = Thought;