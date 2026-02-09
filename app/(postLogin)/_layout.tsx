import { Stack } from "expo-router";

export default function PostLoginLayout() {
    return <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
}