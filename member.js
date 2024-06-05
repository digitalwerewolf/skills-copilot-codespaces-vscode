function skillsMember() {
  var user = getMember();
  var member = user.member;
  var skills = member.skills;
  return skills;
}