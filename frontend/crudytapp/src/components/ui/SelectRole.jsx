import React from 'react'
import { Portal, Select, createListCollection } from "@chakra-ui/react"


const SelectRole = ({setInfo}) => {
  return (
    <Select.Root collection={roles} size="sm" width="320px"    
    onChange={(e)=>setInfo((prev)=>({...prev,role:e.target.value}))}
    >
      <Select.HiddenSelect />
      <Select.Label>Select role</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select role" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {roles.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
const roles = createListCollection({
  items: [
    { label: "Manager", value: "Manager" },
    { label: "HR", value: "HR" },
    { label: "Sales", value: "Sales" },
    { label: "Developer", value: "Developer" },
    { label: "Intern", value: "Intern" },
    
  ],
})
export default SelectRole