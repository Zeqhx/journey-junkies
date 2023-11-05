import { createStyles, Text, Avatar, Group, rem, Flex } from "@mantine/core";
import { IconDiscountCheckFilled } from "@tabler/icons-react";

interface CommentProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
    verify: boolean;
  };
}

const Comment = ({ postedAt, body, author }: CommentProps) => {
  return (
    <Group>
      <Flex align="center" gap={4}>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <Flex direction="column">
          <Text size="sm" weight={500} ml={10}>
            {author.name}
          </Text>
          <Text size="xs" color="dimmed" ml={10} mt={-6}>
            {postedAt}
          </Text>
        </Flex>
        {author.verify && <IconDiscountCheckFilled size={20} />}
      </Flex>
      <div>
        <Text size="sm">{body}</Text>
      </div>
    </Group>
  );
};

export default Comment;
