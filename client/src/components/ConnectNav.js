import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ConnectNav = () => {
    const {user} = useSelector((store) => store.auth)
    
    return (
      <div className="d-flex justify-content-around">
        <Card>
          <Meta
            avatar={<Avatar>{user.user.name[0]}</Avatar>}
            title={user.user.name}
            description={`Joined ${moment(user.user.createdAt).fromNow()}`}
          />
        </Card>
        {user &&
        user.user &&
        user.user.stripe_seller &&
        user.user.stripe_seller.charges_enabled && (
          <>
            <div>Pending balance</div>
            <div>Payout settings</div>
          </>
        )}
      </div>
    );
}

export default ConnectNav
