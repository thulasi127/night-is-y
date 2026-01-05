// ./components/ReadOnlyNotice.tsx
import React from 'react'
import { Box, Card, Text } from '@sanity/ui'

export default function ReadOnlyNotice() {
  return (
    <Box padding={4}>
      <Card tone="caution" padding={4} radius={2} shadow={1}>
        <Text size={2}>
          This document is currently in <strong>read-only</strong> mode because you're viewing the <strong>Published</strong> version.
          <br /><br />
          To make edits, switch to the <strong>Draft</strong> view using the toggle at the top of the screen.
        </Text>
      </Card>
    </Box>
  )
}
