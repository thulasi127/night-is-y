import { TextArea, Stack, Text, Card } from '@sanity/ui'
import { useCallback } from 'react'
import { set, unset, useFormValue } from 'sanity'

export default function CharacterCountTextInput(props) {
  const { value, onChange } = props
  const maxChars = 1000

  // Detect Draft mode by checking for _rev
  const hasRev = useFormValue(['_rev'])
  const isInDraftMode = !!hasRev

  const handleChange = useCallback(
    (event) => {
      const inputValue = event.currentTarget.value
      onChange(inputValue ? set(inputValue) : unset())
    },
    [onChange]
  )

  return (
    <Stack space={2}>
      <TextArea
        value={value}
        rows={6}
        onChange={handleChange}
        placeholder="Write a short bio for Night is Y..."
        readOnly={!isInDraftMode}
        style={{
          backgroundColor: isInDraftMode ? 'transparent' : 'rgba(240, 240, 240, 0.7)',
          color: isInDraftMode ? 'inherit' : '#666',
          cursor: isInDraftMode ? 'text' : 'not-allowed',
        }}
      />

      <Card padding={2} tone={value?.length > maxChars ? 'critical' : 'default'}>
        <Text size={1}>
          {value?.length || 0}/{maxChars} characters
        </Text>
      </Card>

      <Text size={1} muted>
        This field is read-only in <strong>Published</strong> mode. Switch to <strong>Draft</strong> to edit.
      </Text>
    </Stack>
  )
}
