function ok(messageOrData, data) {
  if (data !== undefined) {
    return { success: true, message: messageOrData, data };
  }
  return { success: true, data: messageOrData };
}

function error(message) {
  return { success: false, message };
}

module.exports = { ok, error };
