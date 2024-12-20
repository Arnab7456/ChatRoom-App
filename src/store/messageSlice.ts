import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    id: string;
    text: string;
    isSelf: boolean;
}

interface MessageState {
    messages: Message[];
}

const initialState: MessageState = {
    messages: [],
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Omit<Message, 'id'>>) {
            const newMessage: Message = {
                id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                ...action.payload,
            };

            const isDuplicate = state.messages.some(
                (msg) => msg.text === newMessage.text && msg.isSelf === newMessage.isSelf
            );

            if (!isDuplicate) {
                state.messages.push(newMessage);
            }
        },
        clearMessages(state) {
            state.messages = [];
        },
    },
});

export const { addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
